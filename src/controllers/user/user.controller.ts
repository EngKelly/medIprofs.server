import { AuthGuard } from './../../guards/auth.guard';
import { RoleGuard } from './../../guards/role.guard';
import { UserDto } from '../../services/users/Dto/user.dto';
import { UserService } from '../../services/users/user.service';
import {
  ApiBadRequestResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HttpResponse } from '../../data/Dtos/http.response.dto';
import {
  PaginationQueryDto,
  RequestQuery,
} from '../../data/Dtos/request.query.dto';
import { User } from '../../data/models/user';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiParam({
    name: 'id',
    required: true,
    description: 'update user by id.',
    example: '64ab1a87297483d2a1ac9952',
  })
  @UseGuards(AuthGuard)
  @Put('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() model: UserDto,
  ): Promise<HttpResponse<UserDto>> {
    return await this.userService.updateUserAsync(id, model);
  }

  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: 'User was not deleted with: reason {...}',
        statusCode: 404,
      },
    },
    description: 'Result if user was not deleted',
    status: 404,
  })
  @ApiResponse({
    schema: {
      type: 'object',
      example: {
        message: 'User was deleted',
        statusCode: 200,
      },
    },
    description: 'Result if user was deleted',
    status: 200,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'delete user by id.',
    example: '64abd59ff841a66adf4effec',
  })
  @UseGuards(RoleGuard)
  @Delete('/:id')
  public async deleteUser(@Param('id') id: string): Promise<HttpResponse> {
    return await this.userService.deleteUserAsync(id);
  }

  @ApiQuery({
    name: 'keyword',
    required: false,
    description: 'get user by username.',
    example: 'kelly',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Number of page',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'How many user to return pair page.',
    example: 10,
  })
  @UseGuards(RoleGuard)
  @Get('get-all')
  public async getAllUser(
    @Query() query: PaginationQueryDto,
  ): Promise<HttpResponse<User[]>> {
    return await this.userService.getAllUserAsync(query);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'get user by id.',
    example: '64abd59ff841a66adf4effec',
  })
  @Get('/:id')
  @UseGuards(AuthGuard)
  public async getUser(
    @Param('id') id: string,
  ): Promise<HttpResponse<UserDto>> {
    return await this.userService.getUserAsync(id);
  }
}
