#! /usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { mkdir, writeFile } from 'fs/promises'

const dirname = process.cwd()

const program = new Command()

program
    .name('scaffolda')
    .description('scaffold a web development folder structure')
    .version('1.0.0')

program
    .command('create')
    .description('scaffold an application with starter folders and files')
    .argument('<string>', 'App name')
    .option('-w, --web', 'create a basic web application with html, css, js')
    .option('-b, --bootstrap', 'include the latest bootstrap cdn')
    .option('-t, --test', 'include folder for testing')
    .action((str, options) => {
        if (options.web) {
            const controller = new AbortController();
            const { signal } = controller;
            let dir = ['css', 'js', 'img', 'utils', 'fonts', 'test']
            let color = ['bgGreen', 'bgBlue', 'bgGreen', 'bgBlue', 'bgGreen', 'bgBlue']
            let dirFile = {
                css: 'styles.css',
                js: 'app.js',
                test: 'app.spec.js'
            }


            dir.forEach((v, i) => {
                mkdir(`./${process.argv.slice(-1)}/${v}`, {recursive: true})
                    .then(res => {
                        dirFile[v] ?
                            writeFile(`./${process.argv.slice(-1)}/${v}/${dirFile[v]}`, '/* welcome to scaffolda */', { signal }) :
                            null
                        console.log('hello')
                    })
                    .then(e => {
                        dirFile[v] ?
                            console.log(chalk[`${color[i]}`].white.bold(`${process.argv.slice(-1)}/${v}/${dirFile[v]} scaffolded`)) :
                            console.log(chalk[`${color[i]}`].white.bold(`${process.argv.slice(-1)}/${v} scaffolded`))
                    })
                    .catch(err => {
                        throw err
                    })
            })
        }
    })

    
program.parse();