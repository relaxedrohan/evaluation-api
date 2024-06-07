import { queueConfig } from '../configs/bullmq.config'
import { Worker } from 'bullmq'

export function processQueues() {
    for (const [queueName, { handlers }] of Object.entries(queueConfig)) {
        for (const [jobName, handler] of Object.entries(handlers)) {
            new Worker(queueName, handler, {
                connection: {
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                },
            })

            console.info(`Worker registered for job ${jobName} in queue ${queueName}}`)
        }
    }
}
