import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ACIDLedger {
  async transfer(fromWallet: string, toWallet: string, amount: number, txId: string) {
    return await prisma.$transaction(async (tx) => {
      const from = await tx.wallet.findUnique({ where: { id: fromWallet } });
      const to = await tx.wallet.findUnique({ where: { id: toWallet } });

      if (!from || !to) throw new Error('Wallet not found');
      if (Number(from.balance) < amount) throw new Error('Insufficient funds');

      await tx.wallet.update({
        where: { id: fromWallet },
        data: { balance: { decrement: amount } }
      });

      await tx.wallet.update({
        where: { id: toWallet },
        data: { balance: { increment: amount } }
      });

      const record = await tx.transaction.create({
        data: {
          id: txId,
          walletId: fromWallet,
          amount,
          type: 'TRANSFER',
          status: 'COMPLETED'
        }
      });

      return record;
    });
  }
}
