import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Interest } from './interest.model';

@Schema({ timestamps: true })
export class User extends mongoose.Document {
  @Prop({ required: true, unique: true, immutable: true })
  username: string;

  @Prop({ required: true, immutable: true })
  firstName: string;

  @Prop({ immutable: true })
  middleName: string;

  @Prop({ required: true, immutable: true })
  lastName: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({
    type: { type: 'Point', coordinates: [Number, Number], required: true },
  })
  location: [number, number];

  @Prop({ required: true, minlength: 100, maxlength: 500 })
  aboutMe: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interest' }] })
  interests: Interest[];

  @Prop([String])
  redFlags: string[];
}
