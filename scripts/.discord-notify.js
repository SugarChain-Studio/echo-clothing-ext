const fs = require("fs");

/** Discord 单条消息的最大长度 */
const MAX_LENGTH = 2000;
/** 为分页标记（如 "[2/5]\n"）等预留的余量 */
const RESERVED = 32;
/** 连续发送之间的间隔，避免触发 webhook 限流 */
const SEND_INTERVAL_MS = 700;
const RETRY_DELAY_MS = 2000;
const MAX_RETRIES = 3;

/**
 * 将文本切分为不超过 limit 个字符的分段。
 *
 * 优先在换行处切分，保持 Markdown 结构完整；单行超长时按长度硬切。
 * 切分过程保留原始换行，各段按顺序拼接后与原文一致。
 * @param {string} text
 * @param {number} limit
 * @returns {string[]}
 */
function splitMessage(text, limit) {
    /** @type {string[]} */
    const chunks = [];
    const lines = text.split("\n");
    let current = "";

    for (let index = 0; index < lines.length; index++) {
        // 除最后一行外都带上被 split 去掉的换行符
        const segment = index === lines.length - 1 ? lines[index] : `${lines[index]}\n`;

        if (current.length + segment.length <= limit) {
            current += segment;
            continue;
        }

        if (current) chunks.push(current);
        current = "";

        if (segment.length <= limit) {
            current = segment;
            continue;
        }

        // 单行超过上限，按长度硬切
        let rest = segment;
        while (rest.length > limit) {
            chunks.push(rest.slice(0, limit));
            rest = rest.slice(limit);
        }
        current = rest;
    }

    if (current) chunks.push(current);
    return chunks;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 发送一条消息，遇到限流时按 retry_after 等待后重试。
 * @param {string} webhookURL
 * @param {string} content
 */
async function sendMessage(webhookURL, content) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        });

        if (response.ok) return;

        const body = await response.text();
        if (response.status !== 429 || attempt === MAX_RETRIES) {
            throw new Error(`Discord webhook responded ${response.status}: ${body}`);
        }

        let retryAfter = RETRY_DELAY_MS;
        try {
            retryAfter = Math.ceil((JSON.parse(body).retry_after ?? 2) * 1000);
        } catch {
            // 非 JSON 响应时使用默认等待时间
        }
        await sleep(retryAfter);
    }
}

async function main() {
    const webhookURL = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookURL) {
        console.error("DISCORD_WEBHOOK_URL is not set");
        process.exit(1);
    }

    const sourcePath = process.argv[2] || "temp.txt";
    const text = fs.readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n").trim();
    if (!text) {
        console.log("Message is empty, nothing to send");
        return;
    }

    let chunks = splitMessage(text, MAX_LENGTH - RESERVED);
    if (chunks.length > 1) {
        const total = chunks.length;
        chunks = chunks.map((chunk, index) => `[${index + 1}/${total}]\n${chunk}`);
    }

    console.log(`Sending ${chunks.length} message(s) to Discord`);
    for (let i = 0; i < chunks.length; i++) {
        await sendMessage(webhookURL, chunks[i]);
        console.log(`Sent ${i + 1}/${chunks.length} (${chunks[i].length} chars)`);
        if (i < chunks.length - 1) await sleep(SEND_INTERVAL_MS);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
