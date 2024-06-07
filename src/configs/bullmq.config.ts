import { sendEmailJob } from '../queues/jobs/send-email.job'
import { config } from './config'
import { QueueConfig } from './config.type'

const { REDIS_PORT, REDIS_HOST } = config
export const queueConfig: QueueConfig = {
    SendEmails: {
        options: {
            connection: {
                host: REDIS_HOST,
                port: REDIS_PORT,
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
