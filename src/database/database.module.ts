import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { TaskRepository } from 'src/tasks/task.repository';
import { env } from '../envalid';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Task, TaskRepository]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
