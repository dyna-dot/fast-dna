export default {
    $schema: "http://json-schema.org/schema#",
    title: "Tree view item",
    description: "A tree view item schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-base/tree-view-item",
    formPluginId: "@microsoft/fast-components-react-base/tree-view-item",
    properties: {
        defaultExpanded: {
            title: "Default expanded state",
            type: "boolean",
            default: false,
        },
        selected: {
            title: "Selected state",
            type: "boolean",
        },
    },
    reactProperties: {
        children: {
            title: "Child nodes",
            type: "children",
            defaults: ["@microsoft/fast-components-react-base/tree-view-item"],
        },
        expandCollapseGlyph: {
            title: "Expand / Collapse glyph",
            type: "children",
            formPluginId:
                "@microsoft/fast-components-react-base/tree-view-item/expand-collapse-glyph",
            pluginId:
                "@microsoft/fast-components-react-base/tree-view-item/expand-collapse-glyph",
        },
        titleContent: {
            title: "Title content",
            type: "children",
            formPluginId:
                "@microsoft/fast-components-react-base/tree-view-item/title-region",
            pluginId:
                "@microsoft/fast-components-react-base/tree-view-item/title-region",
        },
    },
    required: ["titleText"],
};
