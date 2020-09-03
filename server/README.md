# Trello Server


```bash
$ npm init

$ npm install body-parser cookie-parser morgan winston dotenv \
express express-session express-mysql-session express-validator \
cors helmet multer bcrypt mysql2 sequelize bcryptjs nodemailer  \
passport passport-local passport-http passport-jwt jsonwebtoken \
node-schedule multer

$ express server

$ node app
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

#### POST request : /auth/mail
: 메일 인증

구분 | 속성 | 타입 | 필수
---|---|---|:---:
body   | email | string | o


#### GET request : /auth/mail?k=키&e=이메일
: 메일 인증


#### POST request : /auth/join  

구분 | 속성 | 타입 | 필수
---|---|---|:---:
body   | email    | string | o
body   | password | string | o
body   | id       | string | x
body   | name     | string | x


#### POST request : /auth/login
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


#### POST request : /auth/refresh-token
: 로그아웃하지 않았다면 한 시간마다 토큰 재발급    

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o


#### POST request : /auth/logout

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o



### User

#### POST request : /user/:[uno || id]

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o



### Card

#### POST request : /card/, /card/list

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o


#### POST request : /card/write

구분 | 속성 | 타입 | 필수 | 비고
---|---|---|:---:|---
header  | accept | string | o | application/json
header  | content-type | string | o | multipart/form-data
header  | authorization | string | o |
body    | title | string | o |
body    | content | string | x |


#### POST request : /card/view, /card/view/:cno

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | cno | number | △


#### POST request : /card/modify, /card/modify/:cno

구분 | 속성 | 타입 | 필수 | 비고
---|---|---|:---:|---
header  | accept | string | o | application/json
header  | content-type | string | o | multipart/form-data
body    | cno | number | △ |
body    | title | string | o |
body    | content | string | x |


#### POST request : /card/delete, /card/delete/:cno

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | cno | number, number[] | △



### File

#### GET request : /download/:fno

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | o
body    | fno | number | △



[top](#)
