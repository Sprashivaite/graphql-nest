import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Body() body: { title: string; description: string },
  ): Promise<Task> {
    return this.taskService.createTask(body.title, body.description);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Param('id') id: number,
    @Body() body: { title: string; description: string },
  ): Promise<Task> {
    return this.taskService.updateTask(id, body.title, body.description);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
