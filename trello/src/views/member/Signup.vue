<template>
<layout-content>
    <section class="signup-wrap">
        <h2>회원가입</h2>

        <form class="signup-form" @submit.prevent="formSubmit">
        <fieldset>
            <legend class="hide">회원 가입 양식 입력</legend>
            <ul>
                <li>
                    <label for="userName">이름</label>
                    <input type="text" id="userName" title="이름을 입력하세요."
                        v-model.lazy="user.name.value">
                    <p class="error-msg" v-show="user.name.error">{{ user.name.error }}</p>
                </li>
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

            <input type="submit" class="btn-reg" value="회원가입">
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

            user: {
                name: {
                    value: '',
                    min: 3,
                    pattern: this.$store.getters.PATTERN.USER_NAME,
                    error: '',
                    required: true,
                    validated: false,
                },
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
            handler: function(user) {
                for(let key in user){
                    if( user[key].value != undefined ) {
                        if( (user[key].value).length > 0 && user[key].validated == false )
                            validate.userForm(user[key]);
                    }
                }
            },
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

            this.$store.dispatch('SIGN_UP', {
                name: this.user.name.value,
                email: this.user.email.value,
                password: this.user.password.value,

            }).then( response => {
                if(response.ok == true){
                    alert('회원 가입 성공, 로그인 페이지로 이동합니다.');
                    this.$router.push('login');

                } else {
                    alert('회원 가입에 실패했습니다.');
                    this.user.name.value = '';
                    this.user.email.value = '';
                    this.user.password.value  = '';
                }
            });

        },
    },

}
</script>



<style scoped>
.signup-wrap {min-width:300px;width:50%;margin:0 auto;padding:50px;
    box-sizing:border-box;box-shadow:0 0 10px #ccc;background:#fff;}
.signup-wrap > h2 {margin-bottom:30px;}

/* form */
.signup-form ul {margin-bottom:30px;}
.signup-form li {margin-bottom:30px;}
.signup-form label {display:inline-block;width:25%;}
.signup-form input[type=text],
.signup-form input[type=password] {width:75%;padding:10px;
    box-sizing:border-box;border-radius:3px;border:1px solid #e5e5e5;}
.signup-form input:focus {outline:0 none;border-color:#026aa7;}

.signup-form input[type=submit] {width:100%;padding:15px 10px;box-sizing:border-box;border-radius:5px;}
.signup-form input[type=submit]:hover {background:#eee;}

.signup-form .error-msg {margin:5px 0 0 25%;color:red;}
</style>
