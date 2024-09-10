import { IsOptional, MaxLength, MinLength } from 'class-validator';
// import { CreateBoardDto } from './create-board.dto';
// import { OmitType, PartialType, PickType } from '@nestjs/swagger';

export class UpdateBoardDto {
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;
}

// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
// 선택 타입만 적용
// export class UpdateBoardDto extends PickType(CreateBoardDto, ['title']) {}

// 선택 타입만 삭제하고 적용
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ['title']) {}
