const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#000B6B',
                            '@menu-item-active-border-width': 'none',
                            '@menu-item-active-bg': 'none',
                            '@menu-item-group-title-color': '#888B93',
                            '@menu-item-color': '#888B93',
                            '@btn-height-lg': '56px',
                            '@input-height-lg': '56px',
                            '@input-bg': '#F7F7F7',
                            'border-radius-base': '8px',
                            '@font-size-base': '20px',
                            '@picker-bg': '"#F7F7F7"',
                            '@checkbox-border-radius': "0px",
                            '@modal-mask-bg': "background: rgba(35, 36, 39, 0.6);",
                            '@select-single-item-height-lg': '56px',
                            '@select-background': '#F7F7F7',
                            '@checkbox-border-radius': '1px',
                            '@checkbox-color': '#2D9319',
                            '@btn-disable-color': '#FFFFFF',
                            '@btn-disable-bg': '#AFB3BD',
                            '@btn-disable-border': '#AFB3BD'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};