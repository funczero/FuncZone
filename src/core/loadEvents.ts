import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Client } from 'discord.js';
import { log } from '../utils/logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadEvents(client: Client): Promise<void> {
  const eventsDir = path.resolve(__dirname, '../events');

  let files: string[] = [];
  try {
    files = await fs.readdir(eventsDir);
    log.info(`Diretório de eventos localizado: ${eventsDir}`);
  } catch (err) {
    log.fatal(`Falha ao acessar o diretório de eventos: ${err instanceof Error ? err.message : err}`);
  }

  const validEventFiles = files.filter((f) => f.endsWith('.ts') || f.endsWith('.js'));
  if (validEventFiles.length === 0) {
    log.warn('Nenhum arquivo de evento encontrado para carregar.');
    return;
  }

  for (const file of validEventFiles) {
    const filePath = path.join(eventsDir, file);
    const fileUrl = pathToFileURL(filePath).href;

    try {
      const event = await import(fileUrl);
      const eventName = path.basename(file).split('.')[0];
      client.on(eventName, event.default);
      log.info(`Evento vinculado com sucesso: '${eventName}'`);
    } catch (error) {
      log.error(`Erro ao carregar o evento '${file}': ${error instanceof Error ? error.message : error}`);
    }
  }

  log.info(`Total de eventos carregados: ${validEventFiles.length}`);
                                                          }
