const fs = require("fs");
const marked = require("marked");
const path = require("path");
const packageJson = require(path.join(process.cwd(), "package.json"));

const fullname = packageJson.modFullName || packageJson.name;

const sourcePath = path.join(
  process.argv[2] || path.join(process.cwd(), "CHANGELOG.md")
);
const targetPath = path.join(
  process.argv[3] || path.join(process.cwd(), "CHANGELOG.html")
);
const cssPath = require.resolve("github-markdown-css");

const changelogFile = fs.readFileSync(sourcePath, "utf8");
const cssContent = fs.readFileSync(cssPath, "utf8");

const htmlContent = marked.parse(changelogFile);
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${fullname} Changelog</title>
<style>
    ${cssContent}
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }
    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>
</head>
<body class="markdown-body">
<h1>${fullname} Changelog</h1>
${htmlContent}
</body>
</html>`;

fs.writeFileSync(targetPath, htmlTemplate);

console.log(`Changelog generated at ${targetPath}`);
