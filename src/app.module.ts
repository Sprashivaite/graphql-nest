import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TaskModule } from './tasks/task.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLAppModule } from './graphql/graphql.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [DatabaseModule, GraphQLAppModule, TaskModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
