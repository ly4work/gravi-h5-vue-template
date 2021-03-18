# gravi-h5-vue-template

### ✨ 基础核心依赖

```yml
dependencies:
    mand-mobile: ^2.5.1
    vue: ^2.6.11
    vue-router: ^3.5.1
    less: ^4.1.1
    less-loader: 5.0.0
    postcss-pxtorem: ^4.0.1
    poststylus: ^1.0.0"
    stylus-loader: ^3.0.2
    vue-cli-plugin-mand: ^0.4.1
node: ^14.0.0
```

### ☘️ 目录结构
```
.  
├── .env.dev  
├── .env.local  
├── .env.prod  
├── .env.test  
├── .env.uat  
├── .gitignore  
├── README.md  
├── babel.config.js  
├── config  
│   └── proxy.js  
├── docker  
│   ├── Dockerfile  
│   ├── enterpoint.sh  
│   └── nginx.conf  
├── package.json  
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── static
│       ├── brid.js
│       └── env.js
├── src
│   ├── App.vue
│   ├── api
│   ├── assets
│   │   ├── gravi.svg
│   │   └── logo.png
│   ├── components
│   ├── main.js
│   ├── routes
│   │   ├── config.js
│   │   └── index.js
│   ├── store
│   ├── styles
│   │   ├── define.less
│   │   ├── reset.less
│   │   └── theme.custom.styl 
│   ├── utils
│   ├── views
│   │   ├── cashier
│   │   │   └── Index.vue
│   │   ├── error
│   │   │   ├── 404.vue
│   │   │   └── Index.vue
│   │   ├── index
│   │   │   ├── Index.vue
│   │   │   └── home
│   │   │       └── Index.vue
│   │   ├── login
│   │   │   ├── Index.vue
│   │   │   └── components
│   │   │       └── LoginInput.vue
│   │   └── welcome
│   │       └── Index.vue
│   └── widgets
│       ├── NtCard
│       │   └── index.vue
│       ├── NtForm
│       │   └── index.vue
│       ├── NtTable
│       │   └── index.vue
│       └── readme.md
├── vue.config.js
└── yarn.lock
```

### 🔥版本历史

- 0.1.0 2021/03/12
  - 内置编译变量配置，支持本地开发直连 dev/test/uat 三套环境数据
  - 内置云效编译配置，包含 docker_build 所需的 docker 构建配置，nginx 反向代理配置，以及 node_build 任务指令
  - api 管理配置，包括拦截器配置
  - vuex 数据管理配置
  - routes 路由配置
  - proxy 本地代理服务配置

- 0.2.0 2021/04 （开发中）
  - 内置 Neutron 组件库（Nt[Component])

### 🧭指令

- `yarn tree`  
  显示目录树

- `yarn install`  
  安装依赖

- `yarn dev:local`  
  启动本地服务，连接 dev 数据库服务，同时将会启动本地 nodejs 服务代理，转发后端请求

- `yarn dev:dev` 启动本地服务，连接 dev 数据库服务，请求域名为线上 dev 环境域名

- `yarn yx-build:dev` 此命令在云效上执行, dev环境编译，test/uat/prod 参数同理，对应响应环境，不需要手动执行，推送代码后会执行 CI

### 🛎️编译环境变量参数说明

- RUN_ENV 数据库连接环境，接口域名
  - local: 本地开发，相对路径，会走 node 的转发代理
  - dev: dev 域名
  - test: test 域名
  - uat: uat 域名
  - prod: prod 域名

### 🎉样式
- 像素设置，自动将 px 转换为 rem，编写样式时只需要写 px 即可
- 主题色设置
    - /styles/theme.custom.styl 用来配置mand组件的全局主题
    - /styles/define.less @main变量用来配置主题色变量

