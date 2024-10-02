import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from 'api/articles/article.module';
import { SeModule } from 'api/se/se.module';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot("mongodb+srv://SPEEDW204_01:W204_01@cluster0.ojzd5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0)"),ArticleModule,SeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
