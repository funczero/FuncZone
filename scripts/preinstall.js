#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

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

const rootDir = process.cwd()
const packageJsonPath = path.join(rootDir, 'package.json')

function logInfo(msg) {
  console.log(chalk.cyan(`[INFO] ${msg}`))
}

function logSuccess(msg) {
  console.log(chalk.green(`[OK] ${msg}`))
}

function logError(msg) {
  console.error(chalk.red(`[ERRO] ${msg}`))
}

function install(pkg, isDev = false) {
  try {
    require.resolve(pkg)
    logSuccess(`${pkg} já está instalado.`)
  } catch {
    logInfo(`Instalando ${pkg}...`)
    try {
      execSync(`npm install ${isDev ? '--save-dev' : ''} ${pkg}`, { stdio: 'inherit' })
      logSuccess(`${pkg} instalado com sucesso.`)
    } catch {
      logError(`Falha ao instalar ${pkg}`)
    }
  }
}

logInfo('Verificando ambiente...')

if (!fs.existsSync(packageJsonPath)) {
  logError('package.json não encontrado. Execute "npm init -y" antes de continuar.')
  process.exit(1)
}

try {
  const nodeVersion = process.version
  const npmVersion = execSync('npm -v').toString().trim()
  logSuccess(`Node: ${nodeVersion}`)
  logSuccess(`NPM: ${npmVersion}`)
} catch {
  logError('Falha ao obter versão do Node ou NPM')
}

if (!fs.existsSync(path.join(rootDir, '.git'))) {
  logInfo('Git não inicializado. Considere rodar "git init" para controle de versão.')
}

logInfo('Instalando dependências...')
dependencies.forEach(pkg => install(pkg, false))

logInfo('Instalando dependências de desenvolvimento...')
devDependencies.forEach(pkg => install(pkg, true))

logSuccess('Setup concluído com sucesso!')
