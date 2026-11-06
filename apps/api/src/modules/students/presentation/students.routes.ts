import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../shared/prisma.js';

const router = Router();
const createStudentSchema = z.object({
  studentCode: z.string().trim().min(1).max(40),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  gradeGroup: z.string().trim().min(1).max(80),
});
const institutionId = process.env.DEFAULT_INSTITUTION_ID ?? 'dev-institution';

router.get('/', async (_request, response, next) => {
  try {
    const students = await prisma.student.findMany({
      where: { institutionId },
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
      take: 100,
    });
    response.json({ data: students });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  const parsed = createStudentSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: 'Datos de estudiante inválidos.', details: parsed.error.flatten() });
    return;
  }

  try {
    const student = await prisma.student.create({
      data: { ...parsed.data, institutionId },
    });
    response.status(201).json({ data: student });
  } catch (error) {
    next(error);
  }
});

export default router;
