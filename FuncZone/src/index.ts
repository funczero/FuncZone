#!/usr/bin/env node

// Carrega variáveis de ambiente
import 'dotenv/config'

// Imports principais usando #aliases
import { logger } from '#utils/logger'
import { startBot } from '#core/loader'

// Handlers globais para erros não capturados
process.on('uncaughtException', err => {
  logger.error('Uncaught Exception:', err)
  process.exit(1)
})

process.on('unhandledRejection', reason => {
  logger.error('Unhandled Rejection:', reason)
  process.exit(1)
})

// Valida variáveis de ambiente obrigatórias
const requiredEnv = ['DISCORD_TOKEN']
const missing = requiredEnv.filter(key => !process.env[key])
if (missing.length) {
  logger.error(`Variáveis de ambiente ausentes: ${missing.join(', ')}`)
  process.exit(1)
}

// Bootstrap
;(async () => {
  try {
    logger.info('Iniciando FuncZone…')
    await startBot()
    logger.info('Bot iniciado com sucesso!')
  } catch (err) {
    logger.error('Falha ao iniciar o bot:', err)
    process.exit(1)
  }
})()
