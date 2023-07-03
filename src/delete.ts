import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {


    const res = await prisma.todo13.delete({
      where: {
        id: 4,
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
