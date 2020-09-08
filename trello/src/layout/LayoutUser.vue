<template>
<layout-content>
<div class="user-home-layout">

    <nav class="nav-layout">
        <router-link to="/">홈</router-link>
        <router-link :to="{ name: 'board-list', params: {} }">보드 리스트</router-link>
    </nav>

    <div class="content-layout">

        <slot />

    </div>

</div>
</layout-content>
</template>



<script>
import { LayoutContent } from '@/layout/'

export default {

    name: 'LayoutUser',

    components: {
        LayoutContent,
        'v-btn-modal': () => import('@/components/BtnModal'),
    },

}
</script>



<style scoped>
.user-home-layout {
    display:grid;
    grid-template-columns:repeat(14, 1fr);
    grid-template-areas: 'f s';
    grid-column-gap:50px;
}


/*** 메뉴 ***/
.nav-layout {grid-area:f;grid-column-start:1;grid-column-end:4;}
.nav-layout > a {display:inline-block;width:100%;}


/*** 내용 ***/
.content-layout {grid-area:s;grid-column-start:4;grid-column-end:15;}
</style>
