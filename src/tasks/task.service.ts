import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(title: string, description: string): Promise<Task> {
    const task = this.taskRepository.create({ title, description });
    return this.taskRepository.save(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    return this.taskRepository.findTaskById(id);
  }

  async updateTask(
    id: number,
    title: string,
    description: string,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    if (!task) {
      return null;
    }

    task.title = title;
    task.description = description;
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
