import { Date } from 'mongoose';

export class CreateArticleDto {
title: string;
authors: string;
published_date: Date;
source: string;
DOI: string;
status: string;
submitted_date: Date;
update_date: Date;
SE_Practice: string;
SE_Claim: string;
Evidence_Level: string;



}
