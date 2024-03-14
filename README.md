# 내배캠 주특기 플러스 주차 개인과제

- ERD https://legend-maxilla-125.notion.site/Typescript-Nest-js-API-2b8d3b75a9fc464dac799e516ad017d7?pvs=4 
- API 명세서 https://drawsql.app/teams/team-2920/diagrams/ticketing

### **👨‍⚕️** 과제 설명

사용자가 원하는 공연을 예매할 수 있는 웹 사이트를 구현해 보셔야 합니다. 물론, **백엔드만 구현하는 것을 목표**로하며 프론트엔드 구현은 선택사항으로 두겠습니다. 각 공연은 공연명, 공연시간, 장소, 가격 등의 정보를 가지고 있어야 할 것이며 사용자는 이를 통해 원하는 공연을 선택하고 예매할 수 있어야 하겠죠?

그러면 여러분들이 최소한 어떠한 기능을 구현해야 하는지 살펴보도록 하겠습니다.

### **✅ 필수** 기능 구현 리스트

- [ ]  로그인 / 회원가입
      
       - 사용자 계정으로 로그인/회원가입 합니다.
       - JWT 방식을 사용하도록 합니다.
- [ ]  프로필 보기

       - 사용자 정보를 볼 수 있는 API 입니다.
       - 필수로 볼 수 있는 정보로는 닉네임, 포인트입니다.
- [ ]  새 공연 등록

       - 사전에 어드민으로 지정된 유저만 해당 API를 호출할 수 있습니다.
       - 유저를 어드민으로 지정하는 것은 DB에서 특정 flag 값을 true로 줘서 지정하도록 해주세요.
         - e.g. users 테이블에서 is_admin 컬럼의 값이 true라면 어드민!
       - 어드민은 새로운 공연을 해당 API를 통해서 등록할 수 있습니다.
       - 새로운 공연을 등록할 때 필요한 데이터는 다음과 같습니다.
         - 공연 이름
         - 공연 설명
         - 공연 날짜 및 시간 - 이것은 배열로 받을 수 있어야 합니다.
         - 공연 장소
         - 좌석 정보
         - 공연 이미지
         - 공연 카테고리
- [ ]  공연 목록 보기
       - 공연의 리스트를 조회합니다.
       - 전체, 공연명별로 나뉘어서 조회 가능합니다.
- [ ]  공연 검색하기
       - 공연명으로 공연을 검색합니다.
       - 검색 결과를 반환합니다.
- [ ]  공연 상세보기
       - 해당 공연의 정보를 반환합니다.
       - 현재 예매가 가능한지 여부를 반환합니다.
- [ ]  좌석을 지정하지 않고 공연 예매하기
       - 사용자가 선택한 공연을 예매합니다.
         - 공연 당일에 현장에서 좌석이 결정된다고 가정하겠습니다.
       - 예매 시 공연 시간, 장소, 가격 등 정보를 반환합니다.
       - 이 경우에는 좌석의 개념은 딱히 두지 않도록 하며 해당 공연 내 가격은 균일가여야 합니다.
         - e.g. 공연 A → 좌석의 구분을 두지 않으며 가격은 30,000 포인트
       - 보유 포인트가 공연 가격보다 낮은 경우에는 예매를 할 수 없도록 해야 합니다.
       - 예약이 이미 만석인 경우엔 예매를 할 수 없도록 합니다.
- [ ]  예매 확인하기
       - 사용자가 예매하거나 과거에 예매했었던 공연들의 내역을 반환합니다.
       - 목록은 예매 날짜 기준 최신 순으로 정렬하도록 합니다.

### **🏆** 보너스 기능 구현 리스트

- [ ]  공연의 좌석 예매 정보 확인하기
- [ ]  좌석을 지정하여 예매하기
- [ ]  동시성 처리하기
- [ ]  예매 취소하기
- [ ]  테스트 코드 내용 채우기

### **💵** 결제 관련 규칙

1. **결제 관련된 기능은 구현하지 않습니다.**
2. 사용자는 **가입시 100만 포인트를 지급**받습니다. 
3. 공연을 예매할 때 **1석에 최대 5만 포인트**까지를 상한 금액으로 정하도록 하겠습니다.
4. 사용자의 보유 포인트가 모자라는 경우 예매를 할 수 없습니다.
5. 예매 취소 기능을 구현한 경우 지불한 포인트는 환불되어야 합니다.

### **🚨** 주의사항

- **필수 기능 구현 리스트**는 전부 구현을 해주세요!
- 서비스를 개발하면서 타입스크립트의 특징을 최대한 활용해 보세요!
- 모든 데이터 구조와 함수에는 적절한 타입 정의를 적용하셔야 하는 것을 잊지마세요.
- 에러 처리는 적절하게 하도록 하세요!

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
