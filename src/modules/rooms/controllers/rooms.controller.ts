import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
    ApiBody,
    ApiConsumes,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../../middlewares/exception.model';
import { RoomService } from '../services/room.service';

import {
    CreateRoomDto,
    GetRoomDto,
    GetRoomsQueryDto,
    RoomDto,
    RoomImageDto,
    UpdateRoomDto,
} from './dto/rooms.dto';
import { RoomAdapter } from '../adapters/rooms.adapter';
import { IsLoginGuard } from '../../../middlewares/is-login.middleware';
import { IsAdminGuard } from '../../../middlewares/is-admin.middleware';
import { CreateRoomImageDto } from './dto/room-images.dto';
import { Paginated, Paging } from '../../../core/pagination/pagination';
import { PaginationInterceptor } from '../../../core/pagination/pagination.interceptor';

@ApiTags('Rooms')
@ApiBearerAuth()
@UseGuards(IsLoginGuard, IsAdminGuard)
@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get(':id')
    @ApiOperation({ summary: 'Get room by id' })
    @ApiOkResponse({ description: 'Room found', type: RoomDto })
    @ApiNotFoundResponse({
        description: 'Room not found',
        type: ErrorResponse,
    })
    async getRoomById(@Param() params: GetRoomDto): Promise<RoomDto> {
        const room = await this.roomService.getRoomById(params.id);
        return RoomAdapter.domainToDto(room);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new room' })
    @ApiNotFoundResponse({ description: 'Room created', type: RoomDto })
    async create(@Body() dto: CreateRoomDto): Promise<RoomDto> {
        const domain = RoomAdapter.createDtoToDomain(dto);
        const created = await this.roomService.createRoom(domain);
        return RoomAdapter.domainToDto(created);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete room by id' })
    @ApiOkResponse({ description: 'Room deleted' })
    @ApiNotFoundResponse({ description: 'Room not found', type: ErrorResponse })
    async deleteRoom(@Param() params: GetRoomDto): Promise<RoomDto> {
        const deletedRoom = await this.roomService.deleteRoom(params.id);
        return RoomAdapter.domainToDto(deletedRoom);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update room by id' })
    @ApiOkResponse({ description: 'Room updated', type: RoomDto })
    @ApiNotFoundResponse({ description: 'Room not found', type: ErrorResponse })
    async updateRoom(
        @Param() params: GetRoomDto,
        @Body() updateDto: UpdateRoomDto,
    ): Promise<RoomDto> {
        const existingRoom = await this.roomService.getRoomById(params.id);
        const updatedDomainRoom = RoomAdapter.patchDtoToDomain(
            existingRoom,
            updateDto,
        );
        const savedRoom = await this.roomService.updateRoom(
            params.id,
            updatedDomainRoom,
        );
        return RoomAdapter.domainToDto(savedRoom);
    }

    @Get()
    @UseInterceptors(PaginationInterceptor)
    @ApiOperation({ summary: 'Get all rooms' })
    @ApiOkResponse({
        description: 'Rooms found',
        type: Paginated<RoomDto>,
    })
    async getAllRooms(
        @Query() query: GetRoomsQueryDto,
        @Query() pagination: Paging,
    ): Promise<Paginated<RoomDto>> {
        return this.roomService.getAllRooms(query, pagination.page, pagination.limit);
    }

    @Delete('images/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a room image' })
    @ApiNoContentResponse({ description: 'Image successfully deleted' })
    @ApiNotFoundResponse({
        description: 'Image not found',
        type: ErrorResponse,
    })
    async deleteRoomImage(@Param('id') id: number): Promise<void> {
        await this.roomService.deleteRoomImage(id);
    }

    @Get(':id/images')
    @ApiOperation({ summary: 'Get all images of a room' })
    @ApiOkResponse({ description: 'Images found', type: [RoomImageDto] })
    @ApiNotFoundResponse({ description: 'Room not found', type: ErrorResponse })
    async getRoomImages(
        @Param('id') roomId: number,
    ): Promise<CreateRoomImageDto[]> {
        return await this.roomService.getRoomImages(roomId);
    }

    @Post(':id/images')
    @ApiOperation({ summary: 'Upload an image for a room' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiOkResponse({ description: 'Image uploaded', type: RoomImageDto })
    @ApiNotFoundResponse({ description: 'Room not found', type: ErrorResponse })
    @UseInterceptors(FileInterceptor('file'))
    async uploadRoomImage(
        @Param('id') roomId: number,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<RoomImageDto> {
        const [url, id] = await this.roomService.uploadRoomImage(roomId, file);
        return {
            id: Number(id),
            url: String(url),
        };
    }
}
