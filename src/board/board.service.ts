import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';


@Injectable()
export class BoardService
{
    constructor
    (
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
    ) {}

    async create(CreateBoardDto: CreateBoardDto): Promise<Board>
    {
        const board = this.boardRepository.create(CreateBoardDto);
        return await this.boardRepository.save(board);
    }

    async findAll(): Promise<Board[]>
    {
        return await this.boardRepository.find
        ({ order: {createAt: 'DESC'}, });
    }

    async findOne(id: number): Promise<Board | null>
    {
        return await this.boardRepository.findOne({where: {id }, });
    }

    async update(id: number, UpdateBoardDto: UpdateBoardDto): Promise<Board | null>
    {
        await this.boardRepository.update(id, UpdateBoardDto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<void>
    {
        await this.boardRepository.delete(id);
    }
}

