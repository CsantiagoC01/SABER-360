import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();
const institutionId = process.env.DEFAULT_INSTITUTION_ID ?? 'dev-institution';
const passwordCost = 12;

const permissionDefinitions = [
  ['institution.manage', 'Administrar la institución y su configuración'],
  ['users.manage', 'Administrar usuarios, roles y permisos'],
  ['students.read', 'Consultar expedientes de estudiantes'],
  ['students.manage', 'Crear y actualizar estudiantes'],
  ['guardians.read', 'Consultar acudientes'],
  ['staff.read', 'Consultar expedientes de personal'],
  ['staff.manage', 'Crear y actualizar expedientes de personal'],
  ['academic.manage', 'Administrar estructura académica y periodos'],
  ['enrollments.manage', 'Administrar matrículas'],
  ['attendance.read', 'Consultar asistencia'],
  ['attendance.manage', 'Registrar y actualizar asistencia'],
  ['grades.read', 'Consultar calificaciones'],
  ['grades.manage', 'Registrar y publicar calificaciones'],
  ['announcements.manage', 'Crear y publicar anuncios'],
  ['reports.read', 'Consultar reportes institucionales'],
  ['audit.read', 'Consultar registros de auditoría'],
] as const;

const roleDefinitions = [
  {
    key: 'ADMIN',
    name: 'Administrador',
    description: 'Administra la institución y sus usuarios.',
    permissions: permissionDefinitions.map(([key]) => key),
  },
  {
    key: 'ACADEMIC_COORDINATOR',
    name: 'Coordinación académica',
    description: 'Gestiona la estructura académica y supervisa el seguimiento escolar.',
    permissions: ['students.read', 'guardians.read', 'staff.read', 'academic.manage', 'enrollments.manage', 'attendance.read', 'grades.read', 'reports.read'],
  },
  {
    key: 'TEACHER',
    name: 'Docente',
    description: 'Gestiona asistencia y calificaciones de sus cursos asignados.',
    permissions: ['students.read', 'attendance.read', 'attendance.manage', 'grades.read', 'grades.manage'],
  },
  {
    key: 'NON_TEACHING_STAFF',
    name: 'Personal no docente',
    description: 'Acceso limitado a funciones administrativas autorizadas.',
    permissions: ['announcements.manage'],
  },
  {
    key: 'STUDENT',
    name: 'Estudiante',
    description: 'Consulta su información académica.',
    permissions: ['grades.read', 'attendance.read'],
  },
  {
    key: 'GUARDIAN',
    name: 'Acudiente',
    description: 'Consulta información autorizada de estudiantes vinculados.',
    permissions: ['students.read', 'attendance.read', 'grades.read'],
  },
] as const;

const testUsers = [
  { email: 'admin@saber360.local', firstName: 'Alex', lastName: 'Administrador', roleKey: 'ADMIN', passwordEnv: 'SEED_ADMIN_PASSWORD' },
  { email: 'coordinacion@saber360.local', firstName: 'Carla', lastName: 'Coordinación', roleKey: 'ACADEMIC_COORDINATOR', passwordEnv: 'SEED_COORDINATOR_PASSWORD' },
  { email: 'docente@saber360.local', firstName: 'Daniel', lastName: 'Docente', roleKey: 'TEACHER', passwordEnv: 'SEED_TEACHER_PASSWORD' },
  { email: 'personal@saber360.local', firstName: 'Patricia', lastName: 'Personal', roleKey: 'NON_TEACHING_STAFF', passwordEnv: 'SEED_STAFF_PASSWORD' },
  { email: 'estudiante@saber360.local', firstName: 'Esteban', lastName: 'Estudiante', roleKey: 'STUDENT', passwordEnv: 'SEED_STUDENT_PASSWORD' },
  { email: 'acudiente@saber360.local', firstName: 'Gabriela', lastName: 'Acudiente', roleKey: 'GUARDIAN', passwordEnv: 'SEED_GUARDIAN_PASSWORD' },
] as const;

async function main() {
  const missingPasswords = testUsers
    .filter(({ passwordEnv }) => !process.env[passwordEnv]?.trim())
    .map(({ passwordEnv }) => passwordEnv);
  if (missingPasswords.length) {
    throw new Error(`Define contraseñas de prueba en apps/api/.env: ${missingPasswords.join(', ')}`);
  }
  for (const { passwordEnv } of testUsers) {
    if (process.env[passwordEnv]!.length < 12) {
      throw new Error(`${passwordEnv} debe tener al menos 12 caracteres.`);
    }
  }

  await prisma.institution.upsert({
    where: { id: institutionId },
    update: {},
    create: { id: institutionId, name: 'Instituto Horizonte', slug: 'instituto-horizonte' },
  });

  const permissionIds = new Map<string, string>();
  for (const [key, description] of permissionDefinitions) {
    const permission = await prisma.permission.upsert({
      where: { key },
      update: { description },
      create: { key, description },
    });
    permissionIds.set(key, permission.id);
  }

  const roleIds = new Map<string, string>();
  for (const definition of roleDefinitions) {
    const role = await prisma.role.upsert({
      where: { institutionId_key: { institutionId, key: definition.key } },
      update: { name: definition.name, description: definition.description },
      create: {
        institutionId,
        key: definition.key,
        name: definition.name,
        description: definition.description,
        isSystem: true,
      },
    });
    roleIds.set(definition.key, role.id);

    for (const permissionKey of definition.permissions) {
      const permissionId = permissionIds.get(permissionKey);
      if (!permissionId) throw new Error(`Permiso no definido: ${permissionKey}`);
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId } },
        update: {},
        create: { roleId: role.id, permissionId },
      });
    }
  }

  for (const testUser of testUsers) {
    const roleId = roleIds.get(testUser.roleKey);
    if (!roleId) throw new Error(`Rol no definido para ${testUser.email}`);

    const user = await prisma.user.upsert({
      where: { email: testUser.email },
      update: { firstName: testUser.firstName, lastName: testUser.lastName, status: 'ACTIVE' },
      create: {
        email: testUser.email,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        status: 'ACTIVE',
        passwordHash: await hash(process.env[testUser.passwordEnv]!, passwordCost),
      },
    });

    const membership = await prisma.userInstitution.upsert({
      where: { userId_institutionId: { userId: user.id, institutionId } },
      update: {},
      create: { userId: user.id, institutionId },
    });

    await prisma.userRole.upsert({
      where: { membershipId_roleId: { membershipId: membership.id, roleId } },
      update: {},
      create: { membershipId: membership.id, roleId },
    });
  }

  console.info(`Seed listo: institución, ${roleDefinitions.length} roles y ${testUsers.length} usuarios de prueba.`);
  console.info('Las contraseñas existentes no se modifican al volver a ejecutar el seed.');
}

main()
  .catch((error: unknown) => {
    console.error('No se pudo cargar la información inicial:', error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
