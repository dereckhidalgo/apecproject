## CREATE .ENV file 
### Postgress Connection
DATABASE_URL="postgresql://pproject:project21@localhost:5435/apecproject?schema=public"
### The secret key is used for signing tokens, such as JWTs, and should be kept secure.
SECRET_KEY= 1234567890

## INSTALL DEPENDENDECIES
npm install

## POSTGRESSDB IMAGE
docker-compose up -d

## PRISMA MIGRATIONS

### INIT MIGRATION
npx prisma migrate dev --name init

### REGENERATE THE PRISMA CLIENT AFTER UPDATE
npx prisma generate

###RESET  DATABASE
npx prisma migrate reset

## RUN PROJECT in development enviroment
npm run dev
