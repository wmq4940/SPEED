import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
@Prop({ required: true })
title: string;
@Prop({ required: true })
authors: string;
@Prop({ type: Date })
published_date: Date;
@Prop()
source: string;
@Prop()
DOI: string;
@Prop()
status: string;
@Prop({ type: Date, default: Date.now })
submitted_date: Date;
@Prop({ type: Date, default: Date.now })
update_date: Date;
@Prop()
SE_Practice: string;
@Prop()
SE_Claim: string;
@Prop()
Evidence_Level: string;
@Prop()
Detail: string;



}

export const ArticleSchema = SchemaFactory.createForClass(Article);