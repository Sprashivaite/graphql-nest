import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateTaskInput, UpdateTaskInput } from './task.input';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { DeleteResult } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class TaskResolver {
  constructor(private readonly taskRepository: TaskRepository) {}

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  @Query(() => Task)
  async task(@Args('id') id: number): Promise<Task> {
    return this.taskRepository.findTaskById(id);
  }

  @Mutation(() => Task)
  async createTask(
    @Args('input') { title, description }: CreateTaskInput,
  ): Promise<Task> {
    const task = this.taskRepository.create({ title, description });

    return this.taskRepository.save(task);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('input') { id, title, description, isCompleted }: UpdateTaskInput,
  ): Promise<Task> {
    const task = await this.taskRepository.findTaskById(id);
    if (!task) {
      return null;
    }

    task.title = title;
    task.description = description;
    task.isCompleted = isCompleted;
    return this.taskRepository.save(task);
  }

  @Mutation(() => String)
  async deleteTask(@Args('id') id: number): Promise<DeleteResult> {
    const task = await this.taskRepository.delete(id);
    return task;
  }
}
