#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()


program
    .version('1.0.0')
    .description('yai-cli: netease ai cli')
program
    .command('* <tpl> <project>')
    .action(function(tpl, project) {
        log.info('目前yai-cli支持以下模板：')
        log.info('yai-cli electron-vue-template/manage-system-template my-project')
        if (tpl && project) {
            let pwd = shell.pwd()
            log.info(`正在拉取模板代码，下载位置：${pwd}/${project}/ ...`)
            clone(`https://github.com/lq782655835/${tpl}.git`, pwd + `/${project}`, null, function() {
                shell.rm('-rf', pwd + `/${project}/.git`)
                log.info('模板工程建立完成')
            })
        } else {
            log.error('example: yai-cli electron-vue-template my-project')
        }
    })
program.parse(process.argv)