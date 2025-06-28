// Carrega variáveis do .env
import 'dotenv/config'

// Core
import { logger } from '@utils/logger.ts'
import { startBot } from '@core/loader.ts'

// Verificação de variáveis obrigatórias
const REQUIRED_ENV = ['DISCORD_TOKEN']
const missing = REQUIRED_ENV.filter(key => !process.env[key])

if (missing.length) {
  logger.error(`Variáveis ausentes: ${missing.join(', ')}`)
  process.exit(1)
}

// Captura global de erros
process.on('uncaughtException', err => {
  logger.error('Erro não tratado:', err)
  process.exit(1)
})

process.on('unhandledRejection', reason => {
  logger.error('Promessa rejeitada:', reason)
  process.exit(1)
})

// Bootstrap
startBot()
  .then(() => logger.info('Bot iniciado com sucesso!'))
  .catch(err => {
    logger.error('Erro ao iniciar o bot:', err)
    process.exit(1)
  })
