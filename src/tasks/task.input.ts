import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field()
  description: string;
}

@InputType()
export class UpdateTaskInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  isCompleted?: boolean;
}
