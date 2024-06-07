import { Queue } from 'bullmq'
import { queueConfig } from '../configs/bullmq.config'

interface Queues {
    [key: string]: Queue
}

export const queues: Queues = {}

export function createQueues() {
    for (const [queueName, config] of Object.entries(queueConfig)) {
        const queue = new Queue(queueName, {
            ...config.options,
        })
        queues[queueName] = queue

        console.info(`Queue ${queueName} created and scheduler attached`)
    }
}
