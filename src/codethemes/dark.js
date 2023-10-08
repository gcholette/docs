module.exports = {
    plain: {
        backgroundColor: "#26262b",
        color: "#d0d2db",
    },
    styles: [
        {
            types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
            style: {
                color: "#61646b",
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
                color: "#7a7d85",
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
                color: "#757982",
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
                color: "#9fa3ab",
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