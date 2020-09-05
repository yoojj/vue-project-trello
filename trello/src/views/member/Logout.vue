<template>
<layout-content>
    <section class="logout-wrap">
        <h2>Logout</h2>
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

}
</script>



<style scoped>
.logout-wrap {text-align:center;}
.logout-wrap h2 {margin-bottom:25px;}
</style>
