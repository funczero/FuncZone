#!/usr/bin/env node
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

const dependencies = ['chalk', 'discord.js', 'dotenv', 'winston', 'moment-timezone']
const devDependencies = ['typescript', 'ts-node', 'tsconfig-paths', '@types/node']

const rootDir = process.cwd()
const packageJsonPath = path.join(rootDir, 'package.json')

function logInfo(msg: string)    { console.log(chalk.cyan(`[INFO] ${msg}`)) }
function logSuccess(msg: string) { console.log(chalk.green(`[OK]   ${msg}`)) }
function logError(msg: string)   { console.error(chalk.red(`[ERRO] ${msg}`)) }

function isInstalled(pkg: string): boolean {
  try {
    require.resolve(pkg)
    return true
  } catch {
    return false
  }
}

function install(pkg: string, isDev = false): void {
  if (isInstalled(pkg)) {
    logSuccess(`${pkg} já está instalado.`)
    return
  }
  logInfo(`Instalando ${pkg}…`)
  try {
    execSync(`npm install ${isDev ? '--save-dev' : ''} ${pkg}`, { stdio: 'inherit' })
    logSuccess(`${pkg} instalado com sucesso.`)
  } catch {
    logError(`Falha ao instalar ${pkg}`)
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
dependencies.forEach(dep => install(dep))

logInfo('Instalando devDependencies…')
devDependencies.forEach(dep => install(dep, true))

logSuccess('Setup concluído!')
