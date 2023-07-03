import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const chanel = { task: 'Buy Milk', completed: true };

    const res = await prisma.todo13.updateMany({
      where: {
        // task:'Walk the dog'
        id: 3,
      },
      data: {
        // task:'Walk many dogs'
        task: 'Push project to GitHUb',
        completed: false,
      },
    });

    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
