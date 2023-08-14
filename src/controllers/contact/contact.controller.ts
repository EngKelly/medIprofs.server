import { PaginationQueryDto } from './../../data/Dtos/request.query.dto';
import { HttpResponse } from './../../data/Dtos/http.response.dto';
import { ContactDto } from 'src/data/Dtos/contact.dto';
import { ContactService } from './../../services/contact/contact.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post('')
  async contactAsync(
    @Body() model: ContactDto,
  ): Promise<HttpResponse<ContactDto>> {
    return await this.contactService.contactAsync(model);
  }

  @ApiQuery({
    name: 'limit',
    example: 'true',
    description: 'fetch contacts by recent data: enter true or false',
  })
  @ApiQuery({
    name: 'page',
    example: '1',
    description: 'how many page to return',
  })
  @ApiQuery({
    name: 'IsFetchByMonth',
    example: true,
    description: 'how many page to return',
  })
  @Get('get-all')
  async getAllAsync(
    @Query() query: PaginationQueryDto,
  ): Promise<HttpResponse<ContactDto[]>> {
    return await this.contactService.findAllContactsAsync(query);
  }

  @ApiParam({
    name: 'Id',
    example: '64ccc47d84ef702de8ec4f1b',
    description: 'Delete contact by Id',
  })
  @Delete('delete/:id')
  async deleteContactAsync(
    @Param() id: string,
  ): Promise<HttpResponse<{ deleted: boolean }>> {
    return this.contactService.deleteContactAsync(id);
  }
}
