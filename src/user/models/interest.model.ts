import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { InterestCategory } from './interest-category.model';

@Schema()
export class Interest extends mongoose.Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InterestCategory' }],
  })
  interests: InterestCategory[];
}

export const InterestSchema = SchemaFactory.createForClass(Interest);
