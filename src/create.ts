import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    //   const data=[
    //     {task:'Buy Milk',completed:true},
    //     {task:'Walk the dog',completed:false},
    //     {task:'Go to Run',completed:false}
    //     ];
    const chanel = { task: 'Buy Milk', completed: true };

    const res = await prisma.todo13.create({
      data: chanel,
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
