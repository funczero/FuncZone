import { execSync } from 'child_process';
import fs from 'fs';

const dependencies = [
  'chalk',
  'discord.js',
  'dotenv',
  'winston',
  'moment-timezone',
];

const devDependencies = [
  'typescript',
  'ts-node',
  'tsconfig-paths',
  '@types/node',
];

function install(pkg: string, isDev: boolean = false) {
  try {
    require.resolve(pkg);
  } catch {
    console.log(`[AUTO-INSTALL] Instalando: ${pkg}...`);
    execSync(`npm install ${isDev ? '--save-dev' : ''} ${pkg}`, { stdio: 'inherit' });
  }
}

console.log('[AUTO-INSTALL] Verificando dependências...');

for (const pkg of dependencies) install(pkg, false);
for (const pkg of devDependencies) install(pkg, true);

console.log('[AUTO-INSTALL] Instalação completa.');
