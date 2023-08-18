import { ConvertToBool } from './../../utils/convertToBool';
import { ObjectIdValidator } from '../../utils/objectId.validator.utils';
import { PaginationQueryDto } from '../../data/Dtos/request.query.dto';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpResponse } from '../../data/Dtos/http.response.dto';
import { Contact } from '../../data/models/contact.model';
import { ContactDto } from '../../data/Dtos/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
    private objectIdValidator: ObjectIdValidator,
    private convertToBool: ConvertToBool,
  ) {}

  async contactAsync(model: ContactDto): Promise<HttpResponse<ContactDto>> {
    if (model == null) {
      throw new BadRequestException('payload cannot be empty');
    }

    const contact = await this.contactModel.create(model);
    const response: HttpResponse<ContactDto> = {
      message: `${model.name} we have received you message, we will get back to you shortly.`,
      statusCode: HttpStatus.OK,
      data: contact,
    };
    return response;
  }

  async findAllContactsAsync(
    query: PaginationQueryDto,
  ): Promise<HttpResponse<ContactDto[]>> {
    let contact: any;
    const skip = (query.page - 1) * Number(query.limit);

    const IsFetchByMonth: boolean = await this.convertToBool.execute(
      query.IsFetchByMonth,
    );
    if (IsFetchByMonth) {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const startDate = new Date(currentYear, currentMonth - 1, 1); // months are 0-indexed
      const endDate = new Date(currentYear, currentMonth, 1); // first day of the next month

      contact = await this.contactModel
        .find({
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        })
        .skip(skip)
        .limit(query.limit)
        .exec();
    } else {
      contact = await this.contactModel.find().skip(skip).limit(query.limit);
    }
    if (contact.length <= 0) {
      const response: HttpResponse = {
        message: 'No contact found.',
        statusCode: HttpStatus.BAD_REQUEST,
      };
      return response;
    }
    const response: HttpResponse<ContactDto[]> = {
      statusCode: HttpStatus.OK,
      message: 'these are list of available messages',
      data: contact,
    };
    return response;
  }

  async deleteContactAsync(
    id: string,
  ): Promise<HttpResponse<{ deleted: boolean }>> {
    this.objectIdValidator.validate(id);

    let contact = await this.contactModel.findById(id).exec();

    if (contact == null) {
      throw new NotFoundException('Message not found.');
    }

    contact = await this.contactModel.findByIdAndDelete(id).exec();

    const response: HttpResponse<{ deleted: boolean }> = {
      message: 'Message deleted.',
      statusCode: HttpStatus.OK,
      data: { deleted: true },
    };
    return response;
  }
}
