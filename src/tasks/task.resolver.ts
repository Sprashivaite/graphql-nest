import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskInput, UpdateTaskInput } from './task.input';
import { TaskType } from './task.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver()
export class TaskResolver {
  constructor(private readonly tasksService: TaskService) {}

  @Query(() => [TaskType])
  async tasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Query(() => TaskType)
  async task(@Args('id') id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Mutation(() => TaskType)
  async createTask(
    @Args('input') { title, description }: CreateTaskInput,
  ): Promise<Task> {
    return this.tasksService.createTask(title, description);
  }

  @Mutation(() => TaskType)
  async updateTask(
    @Args('input') { id, title, description, isCompleted }: UpdateTaskInput,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, title, description, isCompleted);
  }

  @Mutation(() => String)
  async deleteTask(@Args('id') id: number): Promise<string> {
    this.tasksService.deleteTask(id);
    return 'Удалено';
  }
}
