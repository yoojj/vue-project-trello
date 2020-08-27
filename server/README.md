# Trello Server


```bash
$ npm init

$ npm install body-parser cookie-parser morgan winston dotenv \
express express-session express-mysql-session express-validator \
cors helmet multer bcrypt mysql2 sequelize bcryptjs nodemailer \
passport passport-local passport-http passport-jwt jsonwebtoken

$ express server

$ node app
```


## API

**response ex.**

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

#### request : /auth/mail
: 메일 인증

구분 | 속성 | 타입 | 필수
---|---|---|:---:
body   | email | string | O


#### request : /auth/join  

구분 | 속성 | 타입 | 필수
---|---|---|:---:
body   | email    | string | O
body   | password | string | O
body   | id       | string | O


#### request : /auth/login

구분 | 속성 | 타입 | 필수
---|---|---|:---:
body   | email    | string | O
body   | password | string | O


#### request : /auth/refresh-token
: 로그아웃하지 않았다면 한 시간마다 토큰 재발급    

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | O


#### request : /auth/logout

구분 | 속성 | 타입 | 필수
---|---|---|:---:
header  | authorization | string | O



[top](#)
