<template>
<layout-content>
    <section class="signup-wrap">
        <h2>회원가입</h2>

        <form class="mail-auth-from" v-show="isMailSend"@submit.prevent="formMailAuth">
        <fieldset>
            <legend class="hide">이메일 인증</legend>

            <label for="userEmail">메일 인증을 위해 사용하는 이메일을 입력해주세요.</label>

            <input type="text" id="userEmail" title="이메일을 입력하세요."
                v-model.lazy="user.email.value">
            <input type="submit" value="메일 인증">

            <p class="error-msg" v-show="user.email.error">{{ user.email.error }}</p>
        </fieldset>
        </form>

        <div class="code-check-wrap" v-show="isCodeCheck">
            <label for="codeCheck">인증 코드를 입력하세요.</label>
            <input type="text" id="codeCheck" v-model.lazy="code">
            <button type="button" @click="btnCodeCheck">코드 확인</button>
        </div>

        <form class="signup-form" v-show="isMailAuth" @submit.prevent="formUserSignup">
        <fieldset>
            <legend>회원 가입 양식 입력</legend>
            <ul>
                <li>
                    <label for="userName">이름</label>
                    <input type="text" id="userName" title="이름을 입력하세요."
                        v-model.lazy="user.name.value">
                    <p class="error-msg" v-show="user.name.error">{{ user.name.error }}</p>
                </li>
                <li>
                    <label for="userId">아이디</label>
                    <input type="text" id="userId" title="아이디를 입력하세요."
                        v-model.lazy="user.id.value">
                    <p class="error-msg" v-show="user.id.error">{{ user.id.error }}</p>
                </li>
                <li>
                    <label for="userPwd">비밀번호</label>
                    <input type="password" id="userPwd" title="비밀번호을 입력하세요."
                        v-model.lazy="user.password.value">
                    <p class="error-msg" v-show="user.password.error">{{ user.password.error }}</p>
                </li>
            </ul>

            <input type="submit" value="회원가입">
        </fieldset>
        </form>

    </section>
</layout-content>
</template>



<script>
import {LayoutContent} from '@/layout/'
import validate from '@/_utils/validate'

export default {

    name: 'Signup',

    components: {
        LayoutContent,
    },


    data() {
        return {

            isMailSend: true,
            isCodeCheck: true,
            isMailAuth: false,

            code: '',

            user: {
                name: {
                    value: '',
                    min: this.$store.getters.VAILD.NAME.min,
                    pattern: this.$store.getters.PATTERN.USER_NAME,
                    error: '',
                    required: false,
                    validated: false,
                },
                id: {
                    value: '',
                    min: this.$store.getters.VAILD.ID.min,
                    pattern: this.$store.getters.PATTERN.USER_ID,
                    error: '',
                    required: false,
                    validated: false,
                },
                email: {
                    value: '',
                    pattern: this.$store.getters.PATTERN.USER_EMAIL,
                    error : '',
                    required: true,
                    validated: false,
                },
                password: {
                    value: '',
                    min: this.$store.getters.VAILD.PASSWORD.min,
                    pattern: this.$store.getters.PATTERN.USER_PWD,
                    error : '',
                    required: true,
                    validated: false,
                },
            },

        }
    },


    watch: {

        user: {
            deep: true,
            handler: function(user) {
                for(let key in user){
                    if(user[key].value != undefined && user[key].value.length > 0 && user[key].required == true)
                        validate.userForm(user[key]);
                }
            },
        },

    },


    methods: {

        valid(data){

            for(let key in data){
                if(this.user[key].required == true && this.user[key].validated == false){
                    alert('양식을 작성해주세요.');
                    return false;
                }
            }

            return true;
        },

        formMailAuth(){

            const $data = {
                email: this.user.email.value,
            };

            if(this.valid($data) == false) return;

            this.$store.dispatch('MAIL_AUTH',
                $data

            ).then( data => {

                if(data.result.boolean)
                    alert(data.result.message);

                //this.isMailSend = !this.isMailSend;
                //this.isCodeCheck = !this.isCodeCheck;

            }).catch( err => {
                alert(err);
            });

        },

        btnCodeCheck() {

            if(!this.code)
                return alert('인증 코드를 입력해주세요.');

            this.$store.dispatch('CODE_CHECK', {
                code: this.code,

            }).then( data => {

                if(data.result.boolean)
                    alert('메일 인증이 완료되었습니다.');

                this.user.email.value = data.email;

                this.isCodeCheck = !this.isCodeCheck;
                this.isMailSend = !this.isMailSend;
                this.isMailAuth = !this.isMailAuth;

            }).catch( err => {
                alert(err);
            });

        },

        formUserSignup() {

            const $data = {
                name: this.user.name.value,
                id: this.user.id.value,
                email: this.user.email.value,
                password: this.user.password.value,
            };

            if(this.valid($data) == false) return;

            this.$store.dispatch('SIGN_UP',
                $data

            ).then( data => {

                if(data.result.boolean){
                    alert('회원 가입 성공, 로그인 페이지로 이동합니다.');
                    this.$router.push('login');

                } else {
                    alert('회원 가입에 실패했습니다.');
                    this.user.name.value = '';
                    this.user.email.value = '';
                    this.user.password.value  = '';
                }

            }).catch( err => {
                alert(err);
            });

        },
    },
}
</script>



<style scoped>
.signup-wrap {min-width:300px;width:50%;margin:0 auto 0;padding:50px;
    box-sizing:border-box;box-shadow:0 0 10px #ccc;background:#fff;}
.signup-wrap > h2 {margin-bottom:30px;}

.signup-wrap input[type=text],
.signup-wrap input[type=password] {width:70%;margin-right:5px;padding:10px;
    border-radius:3px;border:1px solid #e5e5e5;}

.signup-wrap input[type=submit],
.signup-wrap button[type=button] {padding:10px 15px;border-radius:3px;transition:background .5s;background:#e5e5e5;}

.signup-wrap input[type=submit]:hover,
.signup-wrap button[type=button]:hover {color:#fff;background:#026aa7;}

.error-msg {margin-top:5px;color:red;}


/* 메일 인증 */
.mail-auth-from {margin-bottom:50px;}
.mail-auth-from label {display:inline-block;margin-bottom:5px;}

/* 코드 체크 */
.code-check-wrap {margin-bottom:50px;}
.code-check-wrap label {display:inline-block;margin-bottom:5px;}

/* 가입 양식 */
.signup-form {}
.signup-form legend {margin-bottom:15px;font-weight:bold;}
.signup-form ul {margin-bottom:25px;padding:15px;box-sizing:border-box;background:#f5f5f5;}
.signup-form li {margin-bottom:15px;}
.signup-form label {display:inline-block;width:25%;}
.signup-form input[type=text],
.signup-form input[type=password] {width:70%;box-sizing:border-box;}
.signup-form input:focus {outline:0 none;border-color:#026aa7;}

.signup-form input[type=submit] {width:100%;padding:15px 10px;color:#fff;
    box-sizing:border-box;border-radius:5px;transition:background .5s;background:#333;}
.signup-form input[type=submit]:hover {color:#333;background:#e5e5e5;}

</style>
