const theme = {
    chalk: {
        //背景颜色
        backgroundColor: '#161522',
        //标题颜色
        titleColor : '#fff',
        //左上角logo图标路径
        logoSrc: 'logo_dark.png',
        //切换主题按钮路径
        themeSrc: 'qiehuan_dark.png',
        //顶部边框图片
        headerBorderSrc: 'header_border_dark.png'

    },
    vintage: {
        backgroundColor: '#eee',
        titleColor: '#000',
        logoSrc: 'logo_light2.png',
        themeSrc: 'qiehuan_light.png',
        headerBorderSrc: 'header_border_light.png'

    }
}

export function getThemeValue (themeName) {
    return theme[themeName]
}