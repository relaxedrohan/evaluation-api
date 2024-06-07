
# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! nc -z postgres 5432; do
  sleep 1
done
echo "PostgreSQL is ready!"

# Run migrations
echo "Running migrations..."
npx prisma migrate deploy

# Run the populate-admin-user.ts script
echo "Populating admin user..."
npx ts-node scripts/populate-admin-user.ts || { echo 'Populating admin user failed' ; exit 1; }

# Start the application
echo "Starting the application..."
exec yarn dev
