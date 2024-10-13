import { Module } from '@nestjs/common';
import { SeController } from './se.controller';
import { SeService } from './se.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Se, SeSchema } from './se.schema';
@Module({
imports: [
MongooseModule.forFeature([{ name: Se.name, schema: SeSchema }]),
],
controllers: [SeController],
providers: [SeService],
})
export class SeModule {}