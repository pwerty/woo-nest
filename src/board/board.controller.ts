import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './board.entity';


@Controller('board')
export class BoardController
{
    constructor(private readonly boardService: BoardService) {}

    @Post()
    async create(@Body() createBoardDto: CreateBoardDto): Promise<Board>
    {
        return await this.boardService.create(createBoardDto);
    }

    @Get()
    async findAll(): Promise<Board[]>
    {
        return await this.boardService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Board>
    {
        const board = await this.boardService.findOne(+id);
        if(!board)
        {
            throw new NotFoundException(`not found titles id: ${id}`);
        }
        return board;
    }

    @Patch(':id')
    async update
    (
        @Param('id') id: string,
        @Body() updateBoardDto: UpdateBoardDto,
    ): Promise<Board | null>
    {
        return await this.boardService.update(+id, updateBoardDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ message: string}>
    {
        await this.boardService.remove(+id);
        return { message: 'delete done!'};
    }
}
