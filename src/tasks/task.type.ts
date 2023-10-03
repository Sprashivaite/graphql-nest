import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TaskType {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  isCompleted: boolean;
}
