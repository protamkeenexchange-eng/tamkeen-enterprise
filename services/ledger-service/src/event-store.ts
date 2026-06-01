export type LedgerEventType =
  | 'TRANSFER_REQUESTED'
  | 'TRANSFER_POSTED'
  | 'SETTLEMENT_COMPLETED'
  | 'FX_APPLIED';

export interface LedgerEvent {
  id: string;
  type: LedgerEventType;
  aggregateId: string;
  timestamp: string;
  payload: any;
}

export class EventStore {
  private events: LedgerEvent[] = [];

  append(event: LedgerEvent) {
    this.events.push(event);
  }

  getByAggregate(aggregateId: string) {
    return this.events.filter(e => e.aggregateId === aggregateId);
  }

  replay(aggregateId: string) {
    return this.getByAggregate(aggregateId).reduce((state, event) => {
      switch (event.type) {
        case 'TRANSFER_POSTED':
          return { ...state, status: 'POSTED', ...event.payload };
        case 'SETTLEMENT_COMPLETED':
          return { ...state, status: 'SETTLED' };
        default:
          return state;
      }
    }, {} as any);
  }
}