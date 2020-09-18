<template>
<layout-card>
<section class="card-list-layout">
<div class="card-list-scrollbar-wrap card-list-scrollbar">

    <ul class="card-list">
        <li>
            <v-card />
        </li>
    </ul>

</div>
</section>
</layout-card>
</template>



<script>
import { LayoutCard } from '@/layout/'

export default {

    name: 'CardList',

    components: {
        LayoutCard,
        'v-card' : () => import('@/components/Card.vue'),
    },

    data() {
        return {
        }
    },

    methods: {
    },

}
</script>



<style>
.card-list-layout {width:100%;height:100%;padding:0 10px;box-sizing:border-box;}



/* 스크롤바 */
.card-list-scrollbar-wrap {width:100%;height:80%;}
.card-list-scrollbar {overflow-x:auto;overflow-y:hidden;}
.card-list-scrollbar::-webkit-scrollbar {width:15px;height:15px;}
.card-list-scrollbar::-webkit-scrollbar-button {display:none;}
.card-list-scrollbar::-webkit-scrollbar-corner {display:none;}
.card-list-scrollbar::-webkit-scrollbar-track {border-radius:5px;background-color:rgba(0, 0, 0, 0.2);}
.card-list-scrollbar::-webkit-scrollbar-thumb {border-radius:5px;background-color:rgba(255, 255, 255, 0.5);}



/* 카드 목록 */
.card-list {display:flex;width:max-content;height:100%;}
.card-list > li {width:280px;height:100%;box-sizing:border-box;}
.card-list > li:not(last-child) {margin-right:10px;}
</style>
