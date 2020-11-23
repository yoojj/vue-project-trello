# Trello Server


```bash
$ npm init

$ npm install body-parser cookie-parser morgan winston dotenv \
express express-session express-mysql-session express-validator \
cors helmet multer bcrypt mysql2 sequelize bcryptjs nodemailer  \
passport passport-local passport-http passport-jwt jsonwebtoken \
node-schedule multer uuid

$ express server
```



## API

**response**

```json
{
    "api": "/",
    "result":{
        "boolean": true,
        "code": 1,
        "message": "SUCCESS"
    }
}
```



### Auth

`POST /auth/mail`   
: 입력한 메일로 인증 코드 발송

구분 | 속성 | 타입 | 필수
---|---|---|:---:
body   | email | string | o


`POST /auth/code`  
: 인증 코드에 문제가 없으면 해당 메일로 가입

구분 | 속성 | 타입 | 필수
---|---|---|:---:
body   | code | string | o


`POST /auth/join `    
: 인증된 메일로 나머지 정보 업데이트

구분 | 속성 | 타입 | 필수
---|---|---|:---:
body   | email    | string | o
body   | password | string | o
body   | id       | string | o
body   | name     | string | x

```json
{
  "email": "email",
  "password": "111"
}

{
  "email": "email",
  "password": "111",
  "name": ""
}

{
  "id": "id",
  "email": "email",
  "password": "111",
  "name": ""
}
````


`POST /auth/login`   
: 이메일이나 아이디로 로그인

구분 | 속성 | 타입 | 필수
---|---|---|:---:
body   | email    | string | o
body   | id       | string | x
body   | password | string | o

```json
# 이메일로 로그인
{
  "email": "email",
  "password": "111"
}

# 아이디로 로그인
{
  "email": "null",
  "id": "id",
  "password": "111"
}
```


`POST /auth/refresh-token`   
: 로그아웃하지 않았다면 한 시간마다 토큰 재발급    

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o


`POST /auth/logout`   

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o



### User

`POST /profile`  

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o



### Board

`POST /board, /board/list`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o


`POST /board/write`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | title | string | o
body    | bgcolor | number | x
body    | bookmark | boolean | x


`POST /board/view`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | uuid | string | o


` POST /board/modify`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | uuid | string | o
body    | title | string | o
body    | bgcolor | number | x
body    | bookmark | boolean | x
body    | state | boolean | x


`POST /board/close`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | uuid | string | o



### Card

`POST /card/all-list`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o


`POST /card, /card/list`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | uuid | string | o


`POST /card/write`

구분 | 속성 | 타입 | 필수
---|---|---|:---:|---
header  | authorization | string | o
body    | uuid | string | o
body    | title | string | o
body    | order | number | x
body    | watch | number | x
body    | state | boolen | x


`POST /card/modify`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | accept | string | o
header  | content-type | string | o
body    | cno | number | o
body    | title | string | o
body    | order | number | x
body    | watch | number | x
body    | state | boolen | x


`POST /card/delete`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | cno | number, number[] | o



### Card Content

`POST /content/list`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | cno | number, number[] | o


`POST /content/write`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | uuid | string | o
body    | cno | number | o
body    | content | string | o


`POST /content/view`

구분 | 속성 | 타입 | 필수 | 비고
---|---|---|:---:|---
header  | authorization | string | o |
body    | uno | number | o |


`POST /content/update`

구분 | 속성 | 타입 | 필수 | 비고
---|---|---|:---:|---
header  | accept | string | o | application/json
header  | content-type | string | △ | multipart/form-data
header  | authorization | string | o |
body    | uno | number | o |
body    | content | string | x |
body    | file | string | △ |



### File

`POST /download/:fno`

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | fno | number | △



[top](#)
