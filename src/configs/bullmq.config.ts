import { sendEmailJob } from '../queues/jobs/send-email.job'
import { config } from './config'
import { QueueConfig } from './config.type'

export const queueConfig: QueueConfig = {
    SendEmails: {
        options: {
            connection: {
                host: config.REDIS_HOST,
                port: config.REDIS_PORT,
            },
            defaultJobOptions: {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 5000,
                },
            },
        },
        handlers: {
            'account-creation': sendEmailJob,
        },
    },
}
