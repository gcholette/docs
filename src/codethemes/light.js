module.exports = {
    plain: {
        backgroundColor: "#27272e",
        color: "#d2d3d9",
    },
    styles: [
        {
            types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
            style: {
                color: "#767b82",
            },
        },
        {
            types: ["namespace"],
            style: {
                opacity: 0.7,
            },
        },
        {
            types: ["tag", "operator", "number"],
            style: {
                color: "#a1a4ad",
            },
        },
        {
            types: ["property", "function"],
            style: {
                color: "#ced0d9",
            },
        },
        {
            types: ["tag-id", "selector", "atrule-id"],
            style: {
                color: "#56585c",
            },
        },
        {
            types: ["attr-name"],
            style: {
                color: "#dae0e6",
            },
        },
        {
            types: [
                "boolean",
                "string",
                "entity",
                "url",
                "attr-value",
                "keyword",
                "control",
                "directive",
                "unit",
                "statement",
                "regex",
                "atrule",
                "placeholder",
                "variable",
            ],
            style: {
                color: "#909399",
            },
        },
        {
            types: ["deleted"],
            style: {
                textDecorationLine: "line-through",
            },
        },
        {
            types: ["inserted"],
            style: {
                textDecorationLine: "underline",
            },
        },
        {
            types: ["italic"],
            style: {
                fontStyle: "italic",
            },
        },
        {
            types: ["important", "bold"],
            style: {
                fontWeight: "bold",
            },
        },
        {
            types: ["important"],
            style: {
                color: "#cfcfcf",
            },
        },
    ],
}