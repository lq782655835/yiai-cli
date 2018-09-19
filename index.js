#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()
const projectMap = require('./config')
const version = require('./package.json').version

program
    .version(version)
    .description('yiai-cli: netease ai cli')
program
    .command('* <tpl> <project>')
    .action(function(tpl, project) {
        log.info('目前yiai-cli支持以下模板：')
        log.info('yiai-cli official-website/electron-vue/manage-system my-project')
        if (tpl && project) {
            let pwd = shell.pwd()
            log.info(`正在拉取模板代码，下载位置：${pwd}/${project}/ ...`)

            tpl = projectMap[tpl] || tpl
            clone(`https://github.com/lq782655835/${tpl}.git`, pwd + `/${project}`, null, function() {
                shell.rm('-rf', pwd + `/${project}/.git`)
                log.info('模板工程建立完成')
            })
        } else {
            log.error('example: yiai-cli electron-vue-template my-project')
        }
    })
program.parse(process.argv)