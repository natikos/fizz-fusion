import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class InterestCategory extends mongoose.Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const InterestCategorySchema =
  SchemaFactory.createForClass(InterestCategory);
