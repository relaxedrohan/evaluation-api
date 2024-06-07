import { QueueOptions } from 'bullmq'

export enum NodeEnvironment {
    Development = 'development',
    Test = 'test',
    Production = 'production',
}

export interface QueueConfig {
    [queueName: string]: {
        options: QueueOptions
        handlers: Record<string, (job: any) => Promise<void>>
    }
}
