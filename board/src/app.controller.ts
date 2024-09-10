import {
  Controller,
  Get,
  // HttpException,
  // HttpStatus,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger();

  @Get()
  getHello(@Ip() ip: string): string {
    // console.log(ip);
    this.logger.log(ip);
    this.logger.debug(ip);
    this.logger.error(ip);
    this.logger.verbose(ip);
    this.logger.warn(ip);
    return this.appService.getHello();

    /** Http Exception */
    // throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
  }

  // @Get('name/:name')
  // getName(@Param('name') name: string): string {
  //   return `${name} hello`;
  // }

  // @Get('name/:name')
  // getName(@Query('name') name: string): string {
  //   return `${name} hello`;
  // }
}
