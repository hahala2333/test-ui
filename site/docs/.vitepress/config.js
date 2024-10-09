export default {
  themeConfig: {
    siteTitle: "vitepress",
    nav: [
      { text: '文档', link: '/guild/introduce' },
      { text: "组件", link: "/components/button/" },
    ],
    sidebar: {
      '/': [
        {
          text: '引入',
          items: [
            {
              text: '介绍',
              link: '/guild/introduce'
            },
            {
              text: '快速开始',
              link: '/guild/quickstart'
            }
          ]
        }
      ]
    },

  },
};
