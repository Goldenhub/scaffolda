#! /usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { mkdir, writeFile, readFile } from 'fs/promises'

const controller = new AbortController();
const { signal } = controller;

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
            if (options.bootstrap) {
                let template = null;
                readFile(new URL('template.html', import.meta.url), 'utf-8')
                    .then(res => {
                        template = res;
                        const data = {
                            style: `
                                <!-- Bootstrap 5.2.2 stylesheet cdn -->
                                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
                            `,
    
                            script: `
                                <!-- Bootstrap 5.2.2 script cdn -->
                                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
                            `
                        }
                        for (const [k, v] of Object.entries(data)) {
                            template = template.replace(`{${k}}`, v)
                        }
                        writeFile(new URL('template.html', import.meta.url), template, { signal })
                            .then(res => {
                                return res
                            })
                            .catch(err => {
                                throw err
                            })
                    })
            }

            let dir = ['css', 'js', 'img', 'utils', 'fonts']
            let color = ['bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan']
            let dirFile = {
                css: 'styles.css',
                js: 'app.js',
            }

            if (options.test) {
                dirFile = {
                    ...dirFile,
                    test: 'app.spec.js'
                }
                dir.push('test')
                color.push('bgCyanBright')
            }

            
            mkdir(`./${str}`)
                .then(res => {
                    writeFile(new URL(`./${str}/index.html`, import.meta.url), '', { signal })
                    .then(res => {
                        readFile(new URL('template.html', import.meta.url), { encoding: 'utf-8' })
                            .then(response => {
                                writeFile(`./${str}/index.html`, response, { signal })
                            })
                        })
                    .catch(err => {
                        throw err
                    })
                })
                .catch(err => {
                    throw err
                })
            


            dir.forEach((v, i) => {
                mkdir(`./${str}/${v}`, {recursive: true})
                    .then(res => {
                        dirFile[v] ?
                            writeFile(`./${str}/${v}/${dirFile[v]}`, '/* welcome to scaffolda */', { signal }) :
                            null
                    })
                    .then(e => {
                        dirFile[v] ?
                            console.log(chalk[`${color[i]}`].white.bold(`✅${str}/${v}/${dirFile[v]} scaffolded`)) :
                            console.log(chalk[`${color[i]}`].white.bold(`✅${str}/${v} scaffolded`))
                    })
                    .catch(err => {
                        throw err
                    })
            })

        } else {
            console.log(chalk.bgWhite.redBright.bold('❌ You omitted the --web option'))
        }
    })

    
program.parse();