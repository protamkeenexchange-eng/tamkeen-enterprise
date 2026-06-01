import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding TAMKEEN database...');

  const user = await prisma.user.create({
    data: {
      email: 'admin@tamkeen.local',
      password: '$2b$10$devhash',
      role: 'SUPER_ADMIN'
    }
  });

  const wallet = await prisma.wallet.create({
    data: {
      userId: user.id,
      balance: 100000,
      currency: 'USD'
    }
  });

  await prisma.transaction.createMany({
    data: [
      { amount: 1200, currency: 'USD', status: 'SUCCESS' },
      { amount: 500, currency: 'USD', status: 'PENDING' },
      { amount: 3200, currency: 'USD', status: 'SUCCESS' }
    ]
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });