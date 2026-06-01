import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'tamkeen-transaction-service',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(',')
});

const consumer = kafka.consumer({ groupId: 'transaction-group' });

export async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'TRANSFER_COMPLETED', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value?.toString() || '{}');
      console.log('Processing event:', event);
      // future: update projections, audit logs, fraud checks
    }
  });
}
