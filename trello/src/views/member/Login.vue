<template>
<layout-content>
<section class="login-wrap">
    <h1>로그인</h1>

    <form class="login-form" @submit.prevent="formUserLogin">
    <fieldset>
        <legend class="hide">회원 로그인</legend>
        <ul>
            <li>
                <label for="userEmailOrId">이메일 or 아이디</label>
                <input type="text" id="userEmailOrId" title="이메일이나 아이디를 입력하세요."
                    v-model.lazy="userEmailOrId.value">
                <p class="error-msg" v-show="userEmailOrId.error">{{ userEmailOrId.error }}</p>
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

            userEmailOrId: {
                value: '',
                name: '이메일이나 아이디',
                min: this.$store.getters.VAILD.ID.min,
                pattern: '',
                error : '',
                required: true,
                validated: false,
            },

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
                    name: '비밀번호',
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
            deep: true,
            handler(userEmailOrId) {
                if(userEmailOrId.value.includes('@')){
                    this.user.email.value = userEmailOrId.value;
                    this.user.id.value = '';
                    userEmailOrId.pattern = this.$store.getters.PATTERN.USER_EMAIL;
                } else {
                    this.user.email.value = 'null';
                    this.user.id.value = userEmailOrId.value;
                    userEmailOrId.pattern = this.$store.getters.PATTERN.USER_ID;
                }
            }
        },

    },


    methods: {

        formUserLogin() {

            validate.object({
                e: this.userEmailOrId,
                p: this.user.password,

            }, async(result) => {

                for(let key in result){

                    if(result[key].required == true && result[key].validated == false){
                        key == 'e'
                          ? this.userEmailOrId = result[key]
                          : this.user.password= result[key]
                        return false;
                    }
                }

                await this.$store.dispatch('LOGIN', {
                    email: this.user.email.value,
                    id: this.user.id.value,
                    password: this.user.password.value,

                }).then( data => {

                    if(data.result.boolean){
                        location.href = '/';
                    }

                }).catch( err => {
                    alert(err);
                    this.user.password.value  = '';
                });

            });

        },

    },


}
</script>



<style>
.login-wrap {min-width:300px;width:50%;margin:0 auto;padding:50px;
    box-sizing:border-box;box-shadow:0 0 10px #ccc;background:#fff;}
.login-wrap h1 {margin-bottom:30px;}

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
