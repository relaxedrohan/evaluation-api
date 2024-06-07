import { queueConfig } from '../configs/bullmq.config'
import { queues } from './index'
import { Worker, Job } from 'bullmq'

export function processQueues() {
    for (const [queueName, { handlers }] of Object.entries(queueConfig)) {
        const queue = queues[queueName]
        if (!queue) {
            throw new Error(`Queue "${queueName}" not found`)
        }
        for (const [, handler] of Object.entries(handlers)) {
            const jobHandler = handler as (job: Job) => Promise<void>
            new Worker(queueName, jobHandler, { connection: queue.opts.connection })
        }
    }
}
