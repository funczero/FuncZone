#!/usr/bin/env node
import { execSync } from 'child_process'
import fs           from 'fs'
import path         from 'path'
import chalk        from 'chalk'

const dependencies = [
  'chalk',
  'discord.js',
  'dotenv',
  'winston',
  'moment-timezone'
]
const devDependencies = [
  'typescript',
  'ts-node',
  'tsconfig-paths',
  '@types/node'
]
const rootDir         = process.cwd()
const packageJsonPath = path.join(rootDir, 'package.json')

function logInfo(msg)    { console.log(chalk.cyan(`[INFO] ${msg}`)) }
function logSuccess(msg) { console.log(chalk.green(`[OK]   ${msg}`)) }
function logError(msg)   { console.error(chalk.red(`[ERRO] ${msg}`)) }

function install(pkg, isDev = false) {
  try {
    await import(pkg)          // tenta importar.
    logSuccess(`${pkg} já instalado.`)
  } catch {
    logInfo(`Instalando ${pkg}…`)
    try {
      execSync(`npm install ${isDev? '--save-dev':''} ${pkg}`, { stdio: 'inherit' })
      logSuccess(`${pkg} instalado com sucesso.`)
    } catch {
      logError(`Falha ao instalar ${pkg}`)
    }
  }
}

logInfo('Verificando ambiente…')
if (!fs.existsSync(packageJsonPath)) {
  logError('package.json não encontrado. Rode "npm init" antes.')
  process.exit(1)
}

try {
  logSuccess(`Node: ${process.version}`)
  logSuccess(`NPM:  ${execSync('npm -v').toString().trim()}`)
} catch {
  logError('Não foi possível obter versões de Node/NPM')
}

if (!fs.existsSync(path.join(rootDir, '.git'))) {
  logInfo('Git não inicializado. Considere "git init".')
}

logInfo('Instalando dependências…')
for (const pkg of dependencies)   await install(pkg,false)
logInfo('Instalando devDependencies…')
for (const pkg of devDependencies) await install(pkg,true)
logSuccess('Setup concluído!')
        
