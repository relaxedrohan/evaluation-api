import { queues } from '..'

export async function addJobToQueue(queueName: string, jobName: string, data: any): Promise<void> {
    const queue = queues[queueName]
    if (queue) {
        await queue.add(jobName, data)
        console.info(
            `Added job ${jobName} to queue ${queueName} with data: ${JSON.stringify(data)}`
        )
    } else {
        const errorMessage = `Queue ${queueName} not found.`
        console.error(errorMessage)
        throw new Error(errorMessage)
    }
}
