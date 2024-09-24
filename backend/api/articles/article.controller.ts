import {Body,Controller,Delete,Get,HttpException,HttpStatus,Param,Post,Put, Query,} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { error } from 'console';
    
@Controller('api/articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}
    
    @Get('/test')
      test() {
        return this.articleService.test();
      }
    // Get all articles
    @Get('/')
      async getByPractice(@Query('sepractice') sepractice: string) {
        if(!sepractice || sepractice.trim() === ''){
          try{ return this.articleService.findAll()
            } catch {
            throw new HttpException({
            status:HttpStatus.NOT_FOUND,
            error: "No Articles Found",
            },HttpStatus.NOT_FOUND,
            {cause:error});
          }
        } else {
          try {
          const articles = await this.articleService.findByPractice(sepractice);
            if (!articles || articles.length === 0) {
            throw new HttpException('No articles found for this SE_Practice', HttpStatus.NOT_FOUND);
            }
            return articles;
            } catch (error) {
            throw new HttpException(
              {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'An error occurred while fetching articles',
              },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }



      async findAll() {
        try {
          return this.articleService.findAll();
        } catch {
          throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Article found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
        );
      }
    }
    // Get one article via id
    @Get('/:id')
      async findOne(@Param('id') id: string) {
        try {
          return this.articleService.findOne(id);
        } catch {
          throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No Article found',
        },
          HttpStatus.NOT_FOUND,
          { cause: error },
        );
      }
    }
    // Get all articles via SE_Claim and SE_Practice
    @Get('/:SE_Practice/:SE_Claim')
      async getByClaimAndPractice( @Param('SE_Practice') SE_Practice: string, @Param('SE_Claim') SE_Claim: string) { 
        try {
          return this.articleService.findByClaimAndPractice(SE_Claim, SE_Practice);
        } catch {
          throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No Article found',
            },
            HttpStatus.NOT_FOUND,
            { cause: error },
            );
        }
      }
    
    // Create/add a article
    @Post('/')
      async addArticle(@Body() createArticleDto: CreateArticleDto) {
        try {
          await this.articleService.create(createArticleDto);
          return { message : 'Article created successfully'}
      } catch {
        throw new HttpException(
            {
            status: HttpStatus.BAD_REQUEST,
            error: 'Unable to add this Article',
            },
            HttpStatus.BAD_REQUEST,
            { cause: error },
            );
        }
    }

    // Update an article
    @Put('/:id')
      async updateArticle(
        @Param('id') id: string,
        @Body() createArticleDto: CreateArticleDto,) {
        try {
          await this.articleService.update(id, createArticleDto);
          return { message: 'Article updated successfully' };
        } catch {
        throw new HttpException(
      {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update this Article',
      },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
      }
    }
    // Delete a book via id
    @Delete('/:id')
      async deleteArticle(@Param('id') id: string) {
        try {
        return await await this.articleService.delete(id);
      } catch {
        throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'No such an Article',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
        );
        }
      }        
}

       