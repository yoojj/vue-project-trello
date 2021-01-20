<template>
<layout-user>
<section class="search-wrap">
    <h1>검색</h1>

    <form v-show="search" @submit.prevent="searchBoard">
    <fieldset>
        <legend class="hide">게시판 검색</legend>
        <input type="hidden" v-model="this.$route.query.word">

    </fieldset>
    </form>

</section>
</layout-user>
</template>



<script>
import { LayoutUser } from '@/layout/'

export default {

    name: 'Search',

    components: {
        LayoutUser,
    },

    data () {
        return {
            '$route.query.word': '',
            boardList: '',
        }
    },

    created() {
        this.searchBoard();
    },

    watch: {
        '$route.query.word': 'searchBoard',
    },

    methods: {
        searchBoard(){
            console.log(this.$route.query.word);
        }
    }

}
</script>



<style>
.search-wrap h1 {margin-bottom:50px;}
</style>
