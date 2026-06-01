export type SagaStep = {
  name: string;
  execute: () => Promise<any>;
  compensate: () => Promise<any>;
};

export class Saga {
  private steps: SagaStep[] = [];

  addStep(step: SagaStep) {
    this.steps.push(step);
  }

  async run() {
    const executed: SagaStep[] = [];

    try {
      for (const step of this.steps) {
        await step.execute();
        executed.push(step);
      }
      return { status: 'COMPLETED' };
    } catch (err) {
      for (const step of executed.reverse()) {
        await step.compensate();
      }
      return { status: 'COMPENSATED', error: err };
    }
  }
}
