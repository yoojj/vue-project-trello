<template>
<layout-content>
    <section class="login-wrap">
        <h2>로그인</h2>

        <form class="login-form" @submit.prevent="formUserLogin">
        <fieldset>
            <legend class="hide">회원 로그인</legend>
            <ul>
                <li>
                    <label for="userEmailOrId">이메일 or 아이디</label>
                    <input type="text" id="userEmailOrId" title="이메일이나 아이디를 입력하세요."
                        v-model.lazy="userEmailOrId">
                    <p class="error-msg" v-show="user.email.error || user.id.error">
                        {{ user.email.error || user.id.error }}
                    </p>
                </li>
                <li>
                    <label for="userPwd">비밀번호</label>
                    <input type="password" id="userPwd" title="비밀번호을 입력하세요."
                        v-model.lazy="user.password.value">
                    <p class="error-msg" v-show="user.password.error">{{ user.password.error }}</p>
                </li>
            </ul>

            <input type="submit" value="로그인">
        </fieldset>
        </form>

    </section>
</layout-content>
</template>



<script>
import { LayoutContent } from '@/layout/'
import validate from '@/_utils/validate'

export default {

    name: 'Login',

    components: {
        LayoutContent,
    },

    data() {
        return {
            // 유효성 검사 추가 
            userEmailOrId: '',

            user: {
                email: {
                    value: 'null',
                    pattern: this.$store.getters.PATTERN.USER_EMAIL,
                    error : '',
                    required: false,
                    validated: false,
                },
                id: {
                    value: '',
                    min: this.$store.getters.VAILD.ID.min,
                    pattern: this.$store.getters.PATTERN.USER_ID,
                    error : '',
                    required: false,
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
        userEmailOrId: {
            handler(userEmailOrId) {
                userEmailOrId.includes('@')
                    ? this.user.email.value = userEmailOrId
                    : this.user.id.value = userEmailOrId
            }
        },
    },


    methods: {

        valid(data){
            for(let key in data){

                if(this.user[key].required == true && this.user[key].value.length < 1){
                    alert(`${key}을(를) 작성해주세요.`);
                    return false;

                } else if(this.user[key].required == true && this.user[key].validated == false){
                    validate.userForm(this.user[key]);

                    if(this.user[key].required == true && this.user[key].validated == true){
                        continue;
                    }

                    return false;
                }
            }

            return true;
        },

        formUserLogin() {

            const $data = {
                email: this.user.email.value,
                id: this.user.id.value,
                password: this.user.password.value,
            };

            if(this.valid($data) == false) return;

            this.$store.dispatch('LOGIN',
                $data

            ).then( data => {
                if(data.result.boolean)
                    this.$router.go('/');

            }).catch( err => {
                alert(err);
                this.user.email.value = '';
                this.user.id.value = '';
                this.user.password.value  = '';
            });

        },

    },

}
</script>



<style scoped>
.login-wrap {min-width:300px;width:50%;margin:0 auto;padding:50px;
    box-sizing:border-box;box-shadow:0 0 10px #ccc;background:#fff;}
.login-wrap > h2 {margin-bottom:30px;}

.login-form ul {margin-bottom:30px;}
.login-form li {margin-bottom:30px;}
.login-form label {display:inline-block;width:30%;}
.login-form input[type=text],
.login-form input[type=password] {width:70%;padding:10px;
    box-sizing:border-box;border-radius:3px;border:1px solid #e5e5e5;}
.login-form input:focus {outline:0 none;border-color:#026aa7;}

.login-form input[type=submit] {width:100%;padding:15px 10px;
    box-sizing:border-box;border-radius:5px;transition:background .5s;background:#e5e5e5;}
.login-form input[type=submit]:hover {color:#fff;background:#333;}

.login-form .error-msg {margin:5px 0 0 30%;color:red;}
</style>
