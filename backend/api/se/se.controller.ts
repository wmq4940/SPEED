import {Body,Controller,Delete,Get,HttpException,HttpStatus,Param,Post,Put, Query,} from '@nestjs/common';
import { SeService } from './se.service';
import { CreateSeDto } from './create-se.dto';
import { error } from 'console';
    
@Controller('api/se')
export class SeController {
    constructor(private readonly SeService: SeService) {}
    
    @Get('/test')
      test() {
        return this.SeService.test();
      }
    // Get all SEPractice-SEClaim/only one SEPractice-SEClaim
    @Get('/')
      async getByPractice(@Query('sepractice') sepractice: string) {
        if(!sepractice || sepractice.trim() === ''){
          try{ return this.SeService.findAll()
            } catch {
            throw new HttpException({
            status:HttpStatus.NOT_FOUND,
            error: "No SE_Practice Found",
            },HttpStatus.NOT_FOUND,
            {cause:error});
          }
        } else {
        try {
            const se = await this.SeService.findByPractice(sepractice);
            if (!se || se.length === 0) {
            throw new HttpException("${sepractice} does not exist", HttpStatus.NOT_FOUND);
            }
            return se;
            } catch (error) {
            throw new HttpException(
              {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'An error occurred while fetching data',
              },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }

    // Get one SE_Practice via id
    @Get('/:id')
      async findOne(@Param('id') id: string) {
        try {
          return this.SeService.findOne(id);
        } catch {
          throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '${id} does not exist',
        },
          HttpStatus.NOT_FOUND,
          { cause: error },
        );
      }
    }
    
    // Create/add a SE_Practice with or without SE_Claims
    @Post('/')
      async addArticle(@Body() createSeDto: CreateSeDto) {
        try {
          await this.SeService.create(createSeDto);
          return { message : 'SE_Practice created successfully'}
      } catch {
        throw new HttpException(
            {
            status: HttpStatus.BAD_REQUEST,
            error: 'Unable to add this SE_Practice',
            },
            HttpStatus.BAD_REQUEST,
            { cause: error },
            );
        }
    }

    // Update a SE_Practice
    @Put('/:id')
      async updateArticle(
        @Param('id') id: string,
        @Body() createSeDto: CreateSeDto,) {
        try {
          await this.SeService.update(id, createSeDto);
          return { message: 'SE_Practice updated successfully' };
        } catch {
        throw new HttpException(
      {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unable to update this SE_Practice',
      },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
      }
    }
    // Delete a SE_Practice via id
    @Delete('/:id')
      async deleteArticle(@Param('id') id: string) {
        try {
        return await await this.SeService.delete(id);
      } catch {
        throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'No such an SE_Practice',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
        );
        }
      }        
}

       