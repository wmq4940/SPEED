import { Injectable } from '@nestjs/common';
import { Se } from './se.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSeDto } from './create-se.dto';
@Injectable()
export class SeService {
constructor(@InjectModel(Se.name) private SeModel: Model<Se>) {}

test(): string {
return 'Se route testing';
}

async findAll(): Promise<Se[]> {
return await this.SeModel.find().exec();
}
// Find all articles by SE_Claim and SE_Practice
async findByClaimAndPractice(SE_Claim: string, SE_Practice: string): Promise<Se[]> {
  return this.SeModel.find({ SE_Claim, SE_Practice }).exec();
}

async findByPractice(SE_Practice: string): Promise<Se[]> {
  return this.SeModel.find({ SE_Practice }).exec();
}

async findOne(id: string): Promise<Se> {
return await this.SeModel.findById(id).exec();
}

async create(createArticleDto: CreateSeDto) {
return await this.SeModel.create(createArticleDto);
}

async update(id: string, createArticleDto: CreateSeDto) {
return await this.SeModel.findByIdAndUpdate(id, createArticleDto).exec();
}

async delete(id: string) {
const deletedBook = await this.SeModel.findByIdAndDelete(id).exec();
return deletedBook;
}

}

    