import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SummarizerModule } from './summarizer/summarizer.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'summarizer.db',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true, // Auto-create tables (disable in production)
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    SummarizerModule,
    HistoryModule,
  ],
})
export class AppModule {}

