<template>
    <section class="index-wrap">
        <h1 class="hide">trello intro</h1>

        <section class="index-login-wrap">
            <nav class="index-login-nav">
                <h1><router-link to="/login">Log in to Trello</router-link></h1>
                <h2><router-link to="/signup">or Sing up</router-link></h2>
            </nav>
        </section>
        
    </section>
</template>



<script>
export default {
    name: 'Trello',
}
</script>



<style scoped>
.index-wrap {width:100%;height:100%;
    background-color:#4381b2;background-image:linear-gradient(#4381b2, #4d0099);overflow:hidden;}

/* login */
.index-login-wrap {width:50%;margin:50px auto 0;}

.index-login-nav {text-align:center;}
.index-login-nav a {color:#fff;}
.index-login-nav a:hover {color:rgba(255, 255, 255, 0.5);}
.index-login-nav h1 {margin-bottom:25px;font-size:35px;}
</style>
