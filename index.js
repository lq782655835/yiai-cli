#!/usr/bin/env node

const clone = require('git-clone')
const shell = require('shelljs')
const inquirer = require("inquirer")
const chalk = require("chalk")
const figlet = require("figlet")

const projectMap = require('./config')
const version = require('./package.json').version

const run = async () => {
    print()

    const answers = await askQuestions()
    create(answers)
}

const print = () => console.log(
        chalk.green(
            figlet.textSync("YIAI-CLI", {
                font: "Ghost",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    )

const askQuestions = () => {
    const questions = [
        {
            name: "project",
            type: "input",
            message: "your project name"
        },
        {
            type: "list",
            name: "tpl",
            message: "choice your project template?",
            choices: Object.keys(projectMap)
        }
    ]
    return inquirer.prompt(questions)
}

const create = ({project, tpl}) => {
    let pwd = shell.pwd()
    clone(projectMap[tpl], pwd + `/${project}`, null, function() {
        shell.rm('-rf', pwd + `/${project}/.git`)
        console.log(chalk.green('project is finished'))
    })
}

try {
    run()
} catch (error) {
    console.log(chalk.red(error))
}