import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import css from "@eslint/css";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import tsdoc from "eslint-plugin-tsdoc";

export default defineConfig([
    globalIgnores(["eslint.config.mjs", "vite.config.js", "vercel.json", "**/*config.js*"]),
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.errors,
    jsdoc.configs["flat/recommended-typescript"],
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { tsdoc },
        languageOptions: { globals: globals.browser },
        rules: {
            "@typescript-eslint/explicit-function-return-type": "error",
            "import/order": [
                "error",
                {
                    "newlines-between": "always-and-inside-groups",
                    alphabetize: {
                        order: "asc",
                        orderImportKind: "asc",
                    },
                    named: true,
                    consolidateIslands: "inside-groups",
                },
            ],
            "import/no-unresolved": "off",
            "jsdoc/require-jsdoc": [
                "warn",
                {
                    require: {
                        ArrowFunctionExpression: true,
                        ClassDeclaration: true,
                        ClassExpression: true,
                        FunctionDeclaration: true,
                        FunctionExpression: true,
                        MethodDefinition: true,
                    },
                },
            ],
            "jsdoc/sort-tags": "warn",
            "jsdoc/require-asterisk-prefix": "warn",
            "jsdoc/require-description": "warn",
            "jsdoc/require-description-complete-sentence": "warn",
            "jsdoc/require-example": [
                "warn",
                {
                    exemptNoArguments: true,
                },
            ],
            "jsdoc/require-file-overview": "warn",
            "jsdoc/require-hyphen-before-param-description": "warn",
            "jsdoc/no-bad-blocks": "warn",
            "jsdoc/no-blank-block-descriptions": "warn",
            "jsdoc/no-defaults": "warn",
            "jsdoc/informative-docs": "warn",
            "jsdoc/check-syntax": "warn",
            "jsdoc/sort-tags": [
                "warn",
                {
                    tagSequence: [
                        {
                            tags: [
                                // Brief descriptions
                                "summary",
                                "typeSummary",
                                "remarks",

                                // Module/file-level
                                "module",
                                "exports",
                                "file",
                                "fileoverview",
                                "overview",
                                "import",

                                // Identifying (name, type)
                                "typedef",
                                "interface",
                                "record",
                                "template",
                                "name",
                                "kind",
                                "type",
                                "alias",
                                "external",
                                "host",
                                "callback",
                                "func",
                                "function",
                                "method",
                                "class",
                                "constructor",

                                // Relationships
                                "modifies",
                                "mixes",
                                "mixin",
                                "mixinClass",
                                "mixinFunction",
                                "namespace",
                                "borrows",
                                "constructs",
                                "lends",
                                "implements",
                                "requires",

                                // Long descriptions
                                "desc",
                                "description",
                                "classdesc",
                                "tutorial",
                                "copyright",
                                "license",

                                // Simple annotations
                                "const",
                                "constant",
                                "final",
                                "global",
                                "readonly",
                                "abstract",
                                "virtual",
                                "var",
                                "member",
                                "memberof",
                                "memberof!",
                                "inner",
                                "instance",
                                "inheritdoc",
                                "inheritDoc",
                                "override",
                                "hideconstructor",

                                // Core function/object info
                                "param",
                                "arg",
                                "argument",
                                "prop",
                                "property",
                                "return",
                                "returns",

                                // Important behavior details
                                "async",
                                "generator",
                                "default",
                                "defaultvalue",
                                "enum",
                                "augments",
                                "extends",
                                "throws",
                                "exception",
                                "yield",
                                "yields",
                                "event",
                                "fires",
                                "emits",
                                "listens",
                                "this",

                                // Access
                                "static",
                                "private",
                                "protected",
                                "public",
                                "access",
                                "package",

                                "-other",

                                // Supplementary descriptions
                                "see",
                                "example",

                                // METADATA

                                // Other Closure (undocumented) metadata
                                "closurePrimitive",
                                "customElement",
                                "expose",
                                "hidden",
                                "idGenerator",
                                "meaning",
                                "ngInject",
                                "owner",
                                "wizaction",

                                // Other Closure (documented) metadata
                                "define",
                                "dict",
                                "export",
                                "externs",
                                "implicitCast",
                                "noalias",
                                "nocollapse",
                                "nocompile",
                                "noinline",
                                "nosideeffects",
                                "polymer",
                                "polymerBehavior",
                                "preserve",
                                "struct",
                                "suppress",
                                "unrestricted",

                                // @homer0/prettier-plugin-jsdoc metadata
                                "category",

                                // Non-Closure metadata
                                "ignore",
                                "author",
                                "version",
                                "variation",
                                "since",
                                "deprecated",
                                "todo",
                            ],
                        },
                    ],
                },
            ],
            "tsdoc/syntax": "warn",
        },
        settings: {
            jsdoc: {
                structuredTags: {
                    remarks: {
                        name: false,
                        type: false,
                    },
                },
            },
        },
    },
    {
        files: ["**/*.json"],
        plugins: { json },
        language: "json/json",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.jsonc"],
        plugins: { json },
        language: "json/jsonc",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.css"],
        plugins: { css },
        language: "css/css",
        languageOptions: {
            tolerant: false,
        },
        extends: ["css/recommended"],
    },
]);
