import 'dotenv/config';
import { app } from './app.js';
import { prisma } from './shared/prisma.js';

const port = Number(process.env.PORT ?? 4000);
const server = app.listen(port, '0.0.0.0', () => {
  console.info(`SABER-360 API disponible en http://localhost:${port}`);
});

async function shutdown(signal: string) {
  console.info(`${signal}: cerrando API...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
