import { createApp } from './app';
import { env } from './config/env';
import { startOutboxWorker } from './jobs/outboxWorker';
import { prisma } from './lib/prisma';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`[Studioza API] Operational at http://localhost:${env.PORT}/api/v1 (env: ${env.NODE_ENV})`);
});

// Start background notification outbox worker
const stopOutboxWorker = startOutboxWorker();

// Graceful shutdown
async function gracefulShutdown(signal: string) {
  console.log(`[Studioza API] Received ${signal}. Draining connections...`);
  stopOutboxWorker();

  server.close(async () => {
    await prisma.$disconnect();
    console.log('[Studioza API] Shutdown complete.');
    process.exit(0);
  });
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
