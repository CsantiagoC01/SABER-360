import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../../shared/prisma.js';

const router = Router();
const createStaffSchema = z.object({
  employeeCode: z.string().trim().min(1).max(40),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.email().optional(),
  department: z.string().trim().min(1).max(100),
  position: z.string().trim().min(1).max(100),
  staffType: z.enum(['TEACHING', 'NON_TEACHING']).default('NON_TEACHING'),
});
const institutionId = process.env.DEFAULT_INSTITUTION_ID ?? 'dev-institution';

router.get('/', async (_request, response, next) => {
  try {
    const staff = await prisma.staff.findMany({
      where: { institutionId },
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
      take: 100,
    });
    response.json({ data: staff });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request, response, next) => {
  const parsed = createStaffSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: 'Datos de personal inválidos.', details: parsed.error.flatten() });
    return;
  }

  try {
    const staff = await prisma.staff.create({
      data: { ...parsed.data, institutionId },
    });
    response.status(201).json({ data: staff });
  } catch (error) {
    next(error);
  }
});

export default router;
