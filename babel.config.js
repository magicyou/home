const plugins = [
    [
        'import',
        {
            libraryName: 'ant-design-vue',
            "libraryDirectory": "es", 
            "style": "css",
        }
    ]
];

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
}
