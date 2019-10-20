export class NavigationModel {
  public model: any[];

  constructor() {
    this.model = [
      // {
      //   id: 'home',
      //   title: '主页',
      //   type: 'item',
      //   icon: 'home',
      //   url: '/home'
      // },
      {
        id: 'pages',
        title: '网站管理',
        type: 'collapse',
        icon: 'content_copy',
        children: [
          {
            id: 'server',
            title: '服务管理',
            type: 'item',
            url: '/home/pages/server'
          },
          {
            id: 'site',
            title: '站点管理',
            type: 'item',
            url: '/home/pages/site'
          },
          {
            id: 'tempalte',
            title: '模版管理',
            type: 'item',
            url: '/home/pages/template'
          },
          {
            id: 'model',
            title: '数据模型',
            type: 'item',
            url: '/home/pages/model'
          },
          {
            id: 'page',
            title: '页面管理',
            type: 'item',
            url: '/home/pages/page'
          },
        ]
      },
      {
        id: 'feature',
        title: '功能管理',
        type: 'collapse',
        icon: 'all_out',
        children: [
          {
            id: 'category',
            title: '分类管理',
            type: 'item',
            url: '/home/feature/category'
          },
        ]
      },
      {
        id: 'course',
        title: '课程管理',
        type: 'collapse',
        icon: 'library_books',
        children: [
          {
            id: 'my_course',
            title: '我的课程',
            type: 'item',
            url: '/home/course/manage'
          },
          // {
          //   id: 'my_course',
          //   title: '课程管理',
          //   type: 'item',
          //   url: '/home/course/manage'
          // }
        ]
      }
    ];
  }
}
