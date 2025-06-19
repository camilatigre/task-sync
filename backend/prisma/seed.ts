import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      {
        title: 'Create initial setup',
        description: 'Setup project structure and tooling',
        status: 'todo',
      },
      {
        title: 'Implement backend CRUD',
        description: 'Create service, controller, routes',
        status: 'doing',
      },
      {
        title: 'Write unit tests',
        description: 'Ensure 100% coverage on task service',
        status: 'done',
      },
    ],
  });
  console.log('✅ Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
