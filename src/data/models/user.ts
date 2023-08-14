import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  username: string;

  @Prop({ unique: [true, 'User already exist.'] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  profileURL: string;

  @Prop()
  isAdmin: boolean;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
