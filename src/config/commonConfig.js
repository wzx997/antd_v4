// 通用配置文件

// 城市列表配置
export const provinceList = [
    {
        value: 'guizhou',
        label: '贵州省',
        children: [
            {
                value: 'guiyang',
                label: '贵阳市',
                children: [
                    {
                        value: 'nanming',
                        label: '南明区',
                    },
                    {
                        value: 'yunyan',
                        label: '云岩区',
                    },
                    {
                        value: 'wudnag',
                        label: '乌当区',
                    },
                    {
                        value: 'huaxi',
                        label: '花溪区',
                    },
                    {
                        value: 'xifeng',
                        label: '息烽县',
                    },
                ],
            },
            {
                value: 'qianxinan',
                label: '黔西南',
                children: [
                    {
                        value: 'xingyi',
                        label: '兴义市',
                    },
                    {
                        value: 'xingren',
                        label: '兴仁市',
                    },
                    {
                        value: 'anlong',
                        label: '安龙县',
                    },
                    {
                        value: 'zhenfeng',
                        label: '贞丰县',
                    },
                    {
                        value: 'puan',
                        label: '普安县',
                    },
                ],
            },
        ],
    },
    {
        value: 'hunan',
        label: '湖南省',
        children: [
            {
                value: 'changsha',
                label: '长沙',
                children: [
                    {
                        value: 'furong',
                        label: '芙蓉区',
                    },
                    {
                        value: 'tianxin',
                        label: '天心区',
                    },
                    {
                        value: 'yuelu',
                        label: '岳麓区',
                    },
                    {
                        value: 'kaifu',
                        label: '开福区',
                    },
                    {
                        value: 'yuhua',
                        label: '雨花区',
                    },
                    {
                        value: 'wangcheng',
                        label: '望城区',
                    },
                ],
            },
        ],
    },
];

// 级别配置
export const statusList = [
    {id: 1, name: '初级程序员'},
    {id: 2, name: '中级程序员'},
    {id: 3, name: '高级程序员'},
    {id: 4, name: '资深程序员'},
];

// 爱好配置
export const hobbyList = [
    {id: 1, name: '唱歌'},
    {id: 2, name: '跑步'},
    {id: 3, name: '篮球'},
    {id: 4, name: '足球'},
    {id: 5, name: '阅读'},
    {id: 6, name: '旅游'},
    {id: 7, name: '其他'},
];
