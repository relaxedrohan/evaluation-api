import { Queue } from 'bullmq'
import { queueConfig } from '../configs/bullmq.config'

export const queues: Record<string, Queue> = {}

export function createQueues() {
    for (const [queueName, { options }] of Object.entries(queueConfig)) {
        queues[queueName] = new Queue(queueName, options)
    }
}
