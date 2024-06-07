import { PrismaClient, UserRoles } from '@prisma/client'
import { config } from '../configs/config'

const prisma = new PrismaClient()

async function createAdminuser() {
    const adminUserEmail = config.ADMIN_USER_EMAIL || 'admin@test.com'
    const adminUserPassword = config.ADMIN_USER_PASSWORD || 'supersecurepassword'

    const existingAdminuser = await prisma.account.findFirst({
        where: {
            email: adminUserEmail,
            userRole: UserRoles.ADMIN,
        },
    })

    if (!existingAdminuser) {
        await prisma.account.create({
            data: {
                first_name: 'Admin',
                last_name: 'User',
                email: adminUserEmail,
                phone: '1234567890',
                password: adminUserPassword,
                userRole: UserRoles.ADMIN,
                birthday: '1990-01-01',
            },
        })
        console.log(`Admin user created. email: ${adminUserEmail} `)
    } else {
        console.log('Admin user already exists.')
    }
}

createAdminuser()
    .catch((e) => {
        console.error(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
