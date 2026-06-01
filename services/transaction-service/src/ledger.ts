export type LedgerEntryInput = {
  accountId: string;
  debit?: number;
  credit?: number;
};

export type TransactionInput = {
  id: string;
  entries: LedgerEntryInput[];
};

export class LedgerEngine {
  validateDoubleEntry(entries: LedgerEntryInput[]) {
    const debit = entries.reduce((s, e) => s + (e.debit || 0), 0);
    const credit = entries.reduce((s, e) => s + (e.credit || 0), 0);
    if (debit !== credit) {
      throw new Error('Double-entry imbalance detected');
    }
  }

  postTransaction(tx: TransactionInput) {
    this.validateDoubleEntry(tx.entries);

    return {
      transactionId: tx.id,
      status: 'POSTED',
      entries: tx.entries
    };
  }
}
