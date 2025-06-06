import { PrismaClient } from '@prisma/client';


class DatabaseConnection {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
        
        this.setupGracefulShutdown();
    }

    private setupGracefulShutdown(): void {
    const gracefulShutdown = async (signal: string): Promise<void> => {
      console.log(`Received ${signal}. Closing database connection...`);
      await this.prisma.$disconnect();
      process.exit(0);
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
    process.on('beforeExit', async (): Promise<void> => {
      await this.prisma.$disconnect();
    });
  }

  public getInstance(): PrismaClient {
    return this.prisma;
  }

}

// Singleton pattern
const databaseConnection = new DatabaseConnection();
export const db = databaseConnection.getInstance();