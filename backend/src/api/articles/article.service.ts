import { Injectable,NotFoundException } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
@Injectable()
export class ArticleService {
constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

test(): string {
return 'Article route testing';
}

async findAll(): Promise<Article[]> {
return await this.articleModel.find().exec();
}
// Find all articles by SE_Claim and SE_Practice
async findByClaimAndPractice(SE_Claim: string, SE_Practice: string): Promise<Article[]> {
  return this.articleModel.find({ SE_Claim, SE_Practice }).exec();
}

async findByPractice(SE_Practice: string): Promise<Article[]> {
  return this.articleModel.find({ SE_Practice }).exec();
}

async findOne(id: string): Promise<Article> {
return await this.articleModel.findById(id).exec();
}

async create(createArticleDto: CreateArticleDto) {
return await this.articleModel.create(createArticleDto);
}

async update(id: string, createArticleDto: CreateArticleDto) {
return await this.articleModel.findByIdAndUpdate(id, createArticleDto).exec();
}

async delete(id: string) {
const deletedBook = await this.articleModel.findByIdAndDelete(id).exec();
return deletedBook;
}

}

    