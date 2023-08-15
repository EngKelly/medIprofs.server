import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ConvertToBool {
  async execute(value: string): Promise<boolean> {
    if (typeof value != 'string') {
      throw new BadRequestException('Invalid data type');
    }
    if (value === 'true') return true;
    return false;
  }
}
