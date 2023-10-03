import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApolloClient, InMemoryCache, HttpLink, gql } from 'apollo-boost';
import { CreateTaskInput, UpdateTaskInput } from './task.input';
import { Task } from './task.entity';

@Controller()
export class TaskController {
  private apolloClient: ApolloClient<unknown>;

  constructor() {
    this.apolloClient = new ApolloClient({
      link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
      cache: new InMemoryCache(),
    });
  }

  @Get()
  async find(@Param('id') id: string): Promise<Task> {
    const query = gql`
      query {
        task(id: $id) {
          id
          title
          description
          isCompleted
        }
      }
    `;

    const { data } = await this.apolloClient.query({
      query,
      variables: { id },
    });
    return data.tasks;
  }

  @Get()
  async findAll(): Promise<Task[]> {
    const query = gql`
      query {
        tasks {
          id
          title
          description
          isCompleted
        }
      }
    `;

    const { data } = await this.apolloClient.query({ query });
    return data.tasks;
  }

  @Post()
  async create(@Body() input: CreateTaskInput): Promise<Task> {
    const mutation = gql`
      mutation ($input: CreateTaskInput!) {
        createTask(input: $input) {
          id
          title
          description
        }
      }
    `;

    const { data } = await this.apolloClient.mutate({
      mutation,
      variables: { input },
    });

    return data.createTask;
  }

  @Put()
  async update(@Body() input: UpdateTaskInput): Promise<Task> {
    const mutation = gql`
      mutation ($input: UpdateTaskInput!) {
        updateTask(input: $input) {
          id
          title
          description
          isCompleted
        }
      }
    `;

    const { data } = await this.apolloClient.mutate({
      mutation,
      variables: { input: { ...input } },
    });

    return data.updateTask;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const mutation = gql`
      mutation ($id: Int!) {
        deleteTask(id: $id)
      }
    `;

    await this.apolloClient.mutate({
      mutation,
      variables: { id },
    });
  }
}
