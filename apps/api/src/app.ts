import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import { Prisma } from '@prisma/client';
import studentsRouter from './modules/students/presentation/students.routes.js';
import staffRouter from './modules/staff/presentation/staff.routes.js';
import { prisma } from './shared/prisma.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN ?? 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_request, response) => response.json({ status: 'ok', service: 'saber360-api' }));
app.get('/ready', async (_request, response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    response.json({ status: 'ready', database: 'connected' });
  } catch {
    response.status(503).json({ status: 'not-ready', database: 'unavailable' });
  }
});
app.use('/api/students', studentsRouter);
app.use('/api/staff', staffRouter);
app.use((_request, response) => response.status(404).json({ error: 'Ruta no encontrada.' }));

const errorHandler: ErrorRequestHandler = (error: unknown, _request, response, _next) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    response.status(409).json({ error: 'Ya existe un registro con uno de esos datos únicos.' });
    return;
  }
  console.error(error);
  response.status(500).json({ error: 'Error interno del servidor.' });
};
app.use(errorHandler);
