<template>
<layout-content>
    <section class="login-wrap">
        <h2>로그인</h2>

        <form class="login-form" @submit.prevent="formSubmit">
        <fieldset>
            <legend class="hide">회원 로그인</legend>
            <ul>
                <li>
                    <label for="userEmail">이메일</label>
                    <input type="text" id="userEmail" title="이메일을 입력하세요."
                        v-model.lazy="user.email.value">
                    <p class="error-msg" v-show="user.email.error">{{ user.email.error }}</p>
                </li>
                <li>
                    <label for="userPwd">비밀번호</label>
                    <input type="password" id="userPwd" title="비밀번호을 입력하세요."
                        v-model.lazy="user.password.value">
                    <p class="error-msg" v-show="user.password.error">{{ user.password.error }}</p>
                </li>
            </ul>

            <input type="submit" class="btn-login" value="로그인">
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

            user: {
                email: {
                    value: '',
                    min: 3,
                    pattern: this.$store.getters.PATTERN.USER_EMAIL,
                    error : '',
                    required: true,
                    validated: false,
                },
                password: {
                    value: '',
                    min: 3,
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
            handler(user) {
                for(let key in user){
                    if( user[key].value != undefined ) {
                        if( (user[key].value).length > 0 && user[key].validated == false )
                            validate.userForm(user[key]);
                    }
                }
            }
        },

    },

    methods: {

        formSubmit() {
            for(let key in this.user){
                if( this.user[key].validated == false ){
                    alert('입력 양식을 작성해주세요.');
                    return false;
                }
            }

            this.$store.dispatch('LOGIN', {
                email: this.user.email.value,
                password: this.user.password.value,

            }).then( response => {
                if( response == true ){
                    this.$router.go('/');

                } else if( response == null ) {
                    alert('로그인 실패');
                    this.user.email.value = '';
                    this.user.password.value  = '';
                }
            });

        },

    },

}
</script>



<style scoped>
.login-wrap {min-width:300px;width:50%;margin:0 auto;padding:50px;
    box-sizing:border-box;box-shadow:0 0 10px #ccc;background:#fff;}
.login-wrap > h2 {margin-bottom:30px;}

/* form */
.login-form ul {margin-bottom:30px;}
.login-form li {margin-bottom:30px;}
.login-form label {display:inline-block;width:25%;}
.login-form input[type=text],
.login-form input[type=password] {width:75%;padding:10px;
    box-sizing:border-box;border-radius:3px;border:1px solid #e5e5e5;}
.login-form input:focus {outline:0 none;border-color:#026aa7;}

.login-form input[type=submit] {width:100%;padding:15px 10px;box-sizing:border-box;border-radius:5px;}
.login-form input[type=submit]:hover {background:#eee;}

.login-form .error-msg {margin:5px 0 0 25%;color:red;}
</style>
