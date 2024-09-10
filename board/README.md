## Nest.js
- Node.js 기반 프레임워크
- 효율적이고 안정적이며 확장가능한 서버애플리케이션을 구축하기 위한 진보적인 프레임워크
- Angular 프레임워크에서 영감을 받아 제작된 프레임워크
- **엔터프라이즈급** 애플리케이션 구축에 적함
- 모듈식 아키텍처로 인한 유연한 구조
- Typescript 기반

- 아키텍처 제공 (유지보수에 용이)
  - 모듈, 컨트롤러, 서비스 등 정형화된 아키텍처 제공 
- 데코레이터 사용 (생산성 향상)
  - 클래스, 메서드, 속성에 데코레이터 지원 
- typescript 지원 (코드 자동 완성, 타입 에러 판단으로 인한 안정성)
- 의존성 주입 (유지보수로 인행 발생하는 장애 방지)
  - 의존성 주입을 통해 모듈간 유연한 결합
  - 코드 유연성
  - 테스트 용이


```bash
# npm
$ npm i -g @nestjs/cli
# yarn
$ yarn globacl add @nestjs/cli

$ nest new [project-name]
```

---

## Nest.js의 기본 구조
Request => Controller <=> Service
            => Module

```ts

```

### Module

#### providers
모듈이 생성하고, 의존성 주입 컨테이너에 추가 할 클래스 인스턴스 또는 값의 배열, 주로 서비스와 레파지토리 등이 여기에 포함됨

#### conterollers
모듈이 정의하는 컨트롤러의 배열, 컨트롤러는 클라이언트의 요청을 처리하고, 적절한 응답을 반환하는 역활

#### imports
모듈이 의존하는 다른 모듈의 배열, Nest.js는 이러한 모듈들을 현재 모듈의 providers와 controllers가 사용할 수 있도록 제공

#### exports
모듈에서 제공하며, 다른 모듈에서 import하여 사용할 수 있는 providers의 배열


### Controller
- 클라이언트의 요청을 받아 처리하고 응답을 반환하는 역할, REST API 엔드포인트를 노출하는데 사용
- @Controller 데코레이터 사용, 모든 표준 HTTP 메서드를 데로케이터 제공

```ts
// Routing

@Controller('hello')
export class HelloController {
  @Get()
  get(): string {
    return 'get';
  }

  @Post()
  create():string {
    return 'create';
  }

  @Put()
  update(): string {
    return 'update';
  }

  @Delete()
  remove(): string {
    return 'remove';
  }

  // 매개변수와 쿼리스트링
  // ex) /hello/gildong?country=korea
  @Get(":name")
  get (
    @Param('name') name: string,  // 매개변수
    @Query('country') country: string // 쿼리스트링
  ) {
    return `my name is ${name} from ${country}`
  }
}
```

### Service
- 일반적인 비즈니스 로직을 담당
- 컨트롤러가 클라이언트의 요청을 처리하는데 필요한 작업을 처리
- 데이터베이스의 데이터를 가져오거나 외부 API 호출 등의 데이터 처리

```ts
@Injectable() // 클래스가 주입가능한 상태로 변환
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### File Naming Convention
- Nest.js 에서는 대부분 케밥케이스(kebab-case)를 사용

```
*.module.ts
*.controller.ts
*.service.ts
*.middleware.ts
*.decorator.ts
*.guard.ts
*.exception.ts
*.pipe.ts
```

---

## 게시판 만들기

### 주요 기능
- 게시글 작성
- 게시글 가져오기
- 게시글 수정
- 게시글 삭제
- 회원가입
- 로그인

### 실습
- Nest.js
- TypeORM
- API 문서화
- DTO
- Validation
- 데코레이터
- Exception Filters
- 인증
- 테스트
- 배포

---

## Nest.js Swagger

@nestjs/swagger를 통해 설정

```bash
$ npm i @nestjs/swagger
```

데코레이터를 통해 API 스펙을 명세

---

## DTO

Data Transfer Object

계층 간 데이터 전송을 위해 사용되는 객체

- API 요청에서 받아온 데이터를 타입에 맞게 바인딩 및 유효성 검사
- Service 께층과 Controller 계층 사이에 데이터를 전달
- Response 객체로 데이터를 클라이언트에 전달

```bash
$ npm i class-transformer class-validator
```

```ts
// create-user.dto.ts
export class CreateUserDto {
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @MaxLength(18)
  @IsNotEmpty()
  pw: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  gender?: string;
}
```

- 클래스로 선언
- Typescript 와 class-validator를 사용하여 데이터 유효성 검사 가능

--- 

## Pipes

Route Handler가 실행되기 전 특정 로직을 수행

- 유효성 검사
  - HTTP 요청을 처리할 때, 입력된 데이터가 DTO에 명시된 형태와 일치하는지 확인

- 데이터 변환
  = 입력된 데이터를 다른 형태로 변환
  - ex) 문자열로 제공된 날짜를 Date 객체로 변환

---

## NestJS 데코레이터
- 클래스
  - `@Module()` 모듈 클래스 정의
  - `@Controller()` 컨트롤러 클래스
  - `@Injectable()` 서비스 클래스

- 메서드
  - HTTP 요청 데코레이터
    - @Get()
    - @Post()
    - @Put()
    - @Delete

- 매개변수
  - @Req()
  - @Res()
  - @Body()
  - Query()
  - Param()

- 속성
  클래스의 속성에 추가적인 메타데이터를 제공 하거나 속성 동작을 변경하는데 사용, 일반적으로 ORM 라브러리에서 많이 사용
  ```ts
  @Entity()
  export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column
    name: string()

    @column()
    age: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

  }
  ```

---

## Exception Filters
Client Side 요청이 Route Handler에 도달하기 전 동작하는 것 `\[Pipe\]`

프로그램 실행 중 예외가 발생하면 해당 예외를 처리하는 코드로 라우팅

```ts
/** Global Exception */
{
  "statusCode": 500,
  "message": "Internal server error
}

@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
```

---

## LoggerModule
