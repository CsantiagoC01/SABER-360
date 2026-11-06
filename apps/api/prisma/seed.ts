import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.institution.upsert({
    where: { id: 'dev-institution' },
    update: {},
    create: {
      id: 'dev-institution',
      name: 'Instituto Horizonte',
      slug: 'instituto-horizonte',
    },
  });
  console.info('Institución de desarrollo lista.');
}

main()
  .catch((error: unknown) => {
    console.error('No se pudo cargar la información inicial:', error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
