const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: 'home', // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: 'UI组件',
        key: '/ui',
        icon: 'appstore',
        children: [ // 子菜单列表
            {
                title: '按钮组件',
                key: '/ui/button',
                icon: 'bars'
            },
            {
                title: '模态框组件',
                key: '/ui/modal',
                icon: 'bars'
            },
            {
                title: 'loading组件',
                key: '/ui/loading',
                icon: 'bars'
            },
            {
                title: 'notice组件',
                key: '/ui/notice',
                icon: 'bars'
            },
            {
                title: 'message组件',
                key: '/ui/message',
                icon: 'bars'
            },
            {
                title: 'tabs组件',
                key: '/ui/tabs',
                icon: 'bars'
            },

        ]
    },
    {
        title: '表单组件',
        key: '/form',
        icon: 'appstore',
        children: [ // 子菜单列表
            {
                title: '登录表单',
                key: '/form/login',
                icon: 'bars'
            },
            {
                title: '注册表单',
                key: '/form/reg',
                icon: 'bars'
            },
        ]
    },
    {
        title: '表格组件',
        key: '/table',
        icon: 'appstore',
        children: [ // 子菜单列表
            {
                title: '基本表格',
                key: '/table/base-table',
                icon: 'bars'
            },
        ]
    },
]

export default menuList;