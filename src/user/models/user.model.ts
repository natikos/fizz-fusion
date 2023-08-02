import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Interest } from './interest.model';
import { UserRegistrationStatus } from './types';

@Schema({ timestamps: true })
export class User extends mongoose.Document {
  @Prop({ required: true, unique: true, immutable: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ immutable: true })
  firstName: string;

  @Prop({ immutable: true })
  middleName: string;

  @Prop({ immutable: true })
  lastName: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
    },
  })
  location: [number, number];

  @Prop({ minlength: 100, maxlength: 500 })
  aboutMe: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Interest' }] })
  interests: Interest[];

  @Prop([String])
  redFlags: string[];

  @Prop({
    required: true,
    enum: UserRegistrationStatus,
    default: UserRegistrationStatus.Incomplete,
  })
  registrationStatus: UserRegistrationStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
