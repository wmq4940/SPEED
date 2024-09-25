import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SeDocument = HydratedDocument<Se>;

@Schema()
export class Se {
@Prop()
SE_Claim: string[];
@Prop()
SE_Practice: string;



}

export const SeSchema = SchemaFactory.createForClass(Se);