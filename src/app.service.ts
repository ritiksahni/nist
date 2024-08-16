import { Injectable } from '@nestjs/common';
import { Item } from 'interfaces/items.interface';

@Injectable()
export class AppService {
  private readonly Items: Item[] = [];
  ping(): string {
    return 'Hello World.';
  }

  list(): Item[] {
    return this.Items;
  }

  create(item: string): Item[] {
    this.Items.push({ name: item, isDone: false });
    return this.Items;
  }

  delete(name: string): void {
    this.Items.splice(
      this.Items.findIndex((item) => item.name === name),
      1,
    );
  }

  check(name: string): void {
    const item = this.Items.find((item) => item.name === name);
    if (item) {
      item.isDone = !item.isDone;
    }
  }
}
