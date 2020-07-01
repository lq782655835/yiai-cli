# yiai-cli

init project from uniform cli-tool base on [AI TEAM STANDARD](https://lq782655835.github.io/blogs/team-standard/0.standard-ai-summary.html)

[![NPM Version][npm-img]][npm-url]
[![NPM Download][download-img]][download-url]

[npm-img]: http://img.shields.io/npm/v/yiai-cli.svg?style=flat-square
[npm-url]: http://npmjs.org/package/yiai-cli
[david-img]: https://img.shields.io/github/repo-size/lq782655835/yiai-cli.svg
[david-url]: https://npmjs.org/package/yiai-cli
[download-img]: https://img.shields.io/npm/dm/yiai-cli.svg?style=flat-square
[download-url]: https://npmjs.org/package/yiai-cli

## Insall

``` bash
npm install -g yiai-cli
```

## Usage

``` bash
yiai
```

``` bash
Usage: yiai <command> [options]

Options:
  -V, --version                output the version number
  -h, --help                   display help for command

Commands:
  init [name]                  Initialize a kind of template
  list                         List templates
  serve [dir]                  server built by local static folder
  publish <version>            Publish a new version
  screenshot <url|local-file>  Take a screenshot of a web page
  ghpages                      Push a directory to gh-pages
  help [command]               display help for command
```

## Commands

脚手架包含多个独立命令。

### 1. yiai init

根据模板初始化项目

![image](https://user-images.githubusercontent.com/6310131/56708337-ddee4200-674e-11e9-81cc-f051d064ddbd.png)

you can choice one of below templates:
* [vue-typescirpt](https://github.com/lq782655835/standard-vue-typescript-project)<sup>`new`</sup>
* [vue](https://github.com/lq782655835/standard-vue-project)<sup>`base on vue-cli3`</sup>
* [electron](https://github.com/lq782655835/electron-vue-template.git)<sup>`base on electron-vue`</sup>
* [official-website](https://github.com/lq782655835/official-website-project)<sup>`base on nuxt`</sup>
* [mini-app](https://github.com/lq782655835/mpvue-project)<sup>`base on mpvue`</sup>
* [node-tool](https://github.com/lq782655835/json2ts)

### 2. yiai list

列出所有项目模板

### 3. yiai serve

对项目中build打包后的静态文件，快速开启本地node服务器。使得可以快速预览项目的生产包。默认指向静态文件是`当前执行命令位置`，端口是`3000`

更多参数可使用`yiai serve --help`查看：

``` bash
Usage: yiai-serve [options] [dir]

Options:
  -o, --open                automatically opens a browser window to this server
  -a, --auth <user>:<pass>  specify basic auth credentials
  -F, --format <fmt>        specify the log format string (default: "dev")
  -p, --port <port>         specify the port [3000] (default: 3000)
  -r, --root <root>         specify the root directory [] (default: "")
      --https-port <port>   specify the port [3443] (default: 3443)
  -H, --hidden              enable hidden file serving
  -S, --no-stylus           disable stylus rendering
  -J, --no-pug              disable pug rendering
      --no-less             disable less css rendering
  -I, --no-icons            disable icons
  -L, --no-logs             disable request logging
  -D, --no-dirs             disable directory serving
  -C, --cors                allows cross origin access serving
  -s, --https               also serve over https
      --key                 key file path for https
      --cert                certificate file for https
      --ca                  CA certificate file for https
      --compress            gzip or deflate the response
      --exec <cmd>          execute command on each request
  -h, --help                display help for command
```

## 4. yiai gitsync

支持配置`git-sync.target`,支持`branch、dist`参数设置。更多该工具详情，可看独立npm版本: [git-sync-tool](https://github.com/lq782655835/git-sync-tool)

> 在vue项目的package.json中配置`git-sync.target`，指向egg项目（最终node项目部署）

## 问题列表

1. `yiai gitsync`和`gh-pages`同步工具有何区别?

两者核心功能一致，都可以把指定dist静态文件，同步到另外一个项目的dest目录下，不过yiai gitsync可以有较多的自定义能力，更符合项目扩展。

附上[ghpages](https://github.com/tschaub/gh-pages#publish)同步文件代码：

``` js
const ghpages = require('gh-pages')

// ghpages api方式，同步静态文件
ghpages.publish('dist'), {
  dest: 'app/public',
  repo: 'xxx/webserver-egg.git',
  branch: 'develop'
}, (e) => {
  if (e) {
    console.log('sync failed', e.message)
    return process.exit(1)
  }
})
```

> gh-pages publish[核心源码](https://github.com/tschaub/gh-pages/blob/main/lib/index.js#L48)流程：1. gitclone/git pull/git checkout拿到最新代码到cache文件夹中  2. 清空dest文件夹，并同步dist内容到dest文件夹中  3. git tag/git push推送。

## License

The code is distributed under the ![MIT](https://badgen.net/badge/license/MIT/blue)
