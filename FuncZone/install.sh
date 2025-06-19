#!/bin/bash

echo "📦 Iniciando setup completo do bot..."

# !Cria o package.json se não existir
if [ ! -f package.json ]; then
  echo "🔧 Criando package.json..."
  cat <<EOL > package.json
{
  "name": "punishment",
  "version": "1.0.0",
  "description": "Bot de moderação em TypeScript",
  "main": "dist/index.js",
  "scripts": {
    "dev": "nodemon --watch src --ext ts --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "prepare": "npm install && npm run build"
  },
  "dependencies": {
    "discord.js": "^14.15.0",
    "dotenv": "^16.4.5",
    "winston": "^3.10.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.12",
    "nodemon": "^3.1.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5"
  },
  "type": "module"
}
EOL
fi

# Instalar dependências
echo "📥 Instalando dependências..."
npm install

# Compilar o projeto TypeScript
echo "🔨 Compilando o projeto..."
npm run build

# Iniciar o bot
echo "🚀 Iniciando o bot..."
npm start
