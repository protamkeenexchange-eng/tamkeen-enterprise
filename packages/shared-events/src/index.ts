export type DomainEvent = {
  id: string;
  type: string;
  aggregateId: string;
  timestamp: string;
  payload: any;
};

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe(type: string, handler: (event: DomainEvent) => Promise<void>): void;
}

export class InMemoryEventBus implements EventBus {
  private handlers: Record<string, ((event: DomainEvent) => Promise<void>)[]> = {};

  async publish(event: DomainEvent): Promise<void> {
    const hs = this.handlers[event.type] || [];
    for (const h of hs) {
      await h(event);
    }
  }

  subscribe(type: string, handler: (event: DomainEvent) => Promise<void>): void {
    if (!this.handlers[type]) this.handlers[type] = [];
    this.handlers[type].push(handler);
  }
}
