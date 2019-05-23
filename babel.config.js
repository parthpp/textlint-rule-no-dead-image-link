const presets = [
    [
        "@babel/env",
        {
            targets: {
                node: 6
            }
        }
    ]
];

const plugins = [
    [
        "@babel/plugin-transform-runtime"
    ]
]

module.exports = { presets, plugins };