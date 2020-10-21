<template>
<layout-content>
<section class="logout-wrap" v-if="!isUserLogin">
    <h1>Logout</h1>

    <p>Thanks for using Trello</p>

</section>
</layout-content>
</template>



<script>
import { LayoutContent } from '@/layout/'

export default {

    name: 'Logout',

    components: {
        LayoutContent,
    },

    computed: {
        isUserLogin(){
            return this.$user;
        },
    },

    created() {

        if(this.$user){

            this.$store.dispatch('LOGOUT'
            ).then( data => {

                this.$store.commit('deleteBoardList');
                document.location.reload(true);

            }).catch( err => {
                alert(err);
            });

        }

    },

}
</script>



<style>
.logout-wrap {}
.logout-wrap h1 {margin-bottom:30px;text-align:center;}
.logout-wrap p {text-align:center;}
</style>
