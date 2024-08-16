import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Item } from 'interfaces/items.interface';

interface messages {
  message: string;
}

interface createItemDto {
  todo: string;
}

@Controller()
export class AppController {
  // seems to use `constructor` to get access to the appService object which has the methods.
  constructor(private readonly appService: AppService) {}

  @Get()
  ping(): string {
    return this.appService.ping();
  }

  @Get('list')
  list(): Item[] {
    return this.appService.list();
  }

  @Post('create')
  create(@Body() item: createItemDto): Item[] {
    if (!item.todo) {
      return this.appService.list();
    }
    const new_list = this.appService.create(item.todo);
    return new_list;
  }

  @Post('delete')
  delete(@Body() name: string): messages {
    this.appService.delete(name);
    return { message: 'Item deleted.' };
  }

  @Post('check')
  check(@Body() name: string): messages {
    this.appService.check(name);
    return { message: 'Item updated.' };
  }
}
