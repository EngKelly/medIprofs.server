import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Contact extends Document {
  @IsNotEmpty()
  @Prop()
  name: string;

  @IsNotEmpty()
  @Prop()
  email: string;

  @IsNotEmpty()
  @Prop()
  subject?: string;

  @IsNotEmpty()
  @Prop()
  message: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
