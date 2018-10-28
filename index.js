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
        log.info('blow is format commond for yiai-cli')
        log.info('yiai-cli vue/electron my-project')

        tpl = projectMap[tpl] || tpl
        if (!tpl || !project) {
            log.error('please use format like: yiai-cli vue my-project')
            return
        }

        let pwd = shell.pwd()
        log.info(`download template project code，full path：${pwd}/${project}/ ...`)

        tpl = projectMap[tpl] || tpl
        clone(tpl, pwd + `/${project}`, null, function() {
            shell.rm('-rf', pwd + `/${project}/.git`)
            log.info('project is finished')
        })
    })
program.parse(process.argv)