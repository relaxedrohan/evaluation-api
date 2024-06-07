import { Job } from 'bullmq'

export async function sendEmailJob(job: Job) {
    const { email, username, phone } = job.data
    // Logic to send email to the provided email address
    console.log(
        `Sending email to ${email} for account creation of email: ${username} & phone: ${phone}`
    )
}
