
## Project Setup Guide

### 1. Create a `.env` File

Add the following environment variables:

```env
# PostgreSQL Connection
DATABASE_URL="postgresql://pproject:project21@localhost:5435/apecproject?schema=public"

# Secret key for signing tokens (keep this secure)
SECRET_KEY=1234567890
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Start PostgreSQL Database with Docker

```bash
docker-compose up -d
```

---

### 4. Prisma Migrations

- **Initialize Migration:**
    ```bash
    npx prisma migrate dev --name init
    ```

- **Regenerate Prisma Client (after schema updates):**
    ```bash
    npx prisma generate
    ```

- **Reset Database:**
    ```bash
    npx prisma migrate reset
    ```

---

### 5. Run Project in Development Environment

```bash
npm run dev
```
