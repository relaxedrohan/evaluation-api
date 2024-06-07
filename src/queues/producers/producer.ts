import { queues } from '..'

export function addJobToQueue(queueName: string, jobName: string, data: any) {
    const queue = queues[queueName]
    if (!queue) {
        throw new Error(`Queue "${queueName}" not found`)
    }
    return queue.add(jobName, data)
}
