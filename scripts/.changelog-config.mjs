import { loadPreset } from "conventional-changelog-preset-loader";

const preset = await loadPreset("angular");

export default {
    ...preset,
    writer: {
        ...preset.writer,
        transform: (commit, context) => {
            const result = preset.writer.transform(commit, context);
            if (result?.title === "BREAKING CHANGES") return result;
            if (commit.type === "adjust") {
                return { ...result, type: "Adjustments" };
            }
            return result;
        },
    },
};
