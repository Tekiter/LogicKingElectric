# 논리왕 전기 E 팀

[2021 전력데이터 활용 신서비스 개발 경진대회](https://home.kepco.co.kr/kepco/NS/C/A/htmlView/NSCAHP001.do) 수상작 (우수상)

## 필요 소프트웨어

-   node
-   npm
-   yarn

## 프로젝트 구조

모노레포 프로젝트입니다. `packages` 디렉터리 안에 각각의 서브 프로젝트들이 존재합니다.

모노레포는 `yarn`의 `workspace` 기능을 활용했습니다.

#### client

next.js 기반의 프론트엔드입니다.

#### server

node.js 기반의 백엔드 서버입니다. 대부분의 연산이 여기서 수행됩니다.

#### shared

API 타입 등의 서버와 클라이언트가 공유하는 코드들이 있습니다.

## 프로젝트 셋업

적절한 곳에 리포지토리를 클론합니다. 그리고 `yarn install` 명령을 실행합니다.

**절대 `npm` 명령을 사용하면 안됩니다!!** 모노레포가 제대로 인식되지 않습니다. 모든 경우에 꼭 `yarn` 명령을 사용해야 합니다.

## 프로젝트 진행

### 포매팅

ESLint와 Prettier가 코드 Lint와 포매팅을 수행합니다. 프로젝트에 있는 husky 모듈이 git commit 을 할때마다 자동으로 포매팅을 시도합니다. 여기서 Lint 조건을 만족시키지 못하면 커밋이 진행되지 않습니다.
에디터로 vscode를 사용하고 ESLint 확장과 Prettier 확장을 설치해서 저장할 때 마다 Lint 오류 점검과 자동 Prettier 실행을 하기를 권장합니다.

## 테스트

테스트는 프로젝트 루트에서만 실행 가능합니다. 이는 통일된 테스트 설정을 유지하기 위함입니다.

테스트 명령어: `yarn test`

## 디버그 모드 실행

-   프론트엔드 실행 : `yarn client dev'
-   백엔드 실행 : `yarn server dev`

## 프로젝트 빌드와 실행

-   필요 모듈 설치 : `yarn install`
-   공용 모듈 빌드 : `yarn shared build`
-   서버 빌드 : `yarn server build`
-   프론트엔드 빌드 : `yarn client build`

-   서버 실행 : `yarn server start`
-   프론트엔드 실행 : `yarn client start`

### 환경 변수 설정

실행할 때 환경 변수로 적절한 서버 설정값을 지정해줘야 합니다.

| 환경변수 키          | 설명                                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| JWT_SECRET           | 유저 세션 저장에 사용되는 Secret으로, 적절한 난수 문자열을 설정해야 합니다.                    |
| USE_REAL_API         | 실제 API에 연결해서 사용할 지 여부로, TRUE 또는 FALSE 값을 지정해야 합니다.                    |
| OPEN_WEATHER_API_KEY | 날씨 정보를 가져오는 데 사용하는 [OpenWeatherMap](https://openweathermap.org/)의 API 키입니다. |
