<template>
<layout-content>
<div class="user-home-layout">

    <nav class="nav-layout" :style="{'--nav-width': navWidth}">
        <router-link to="/">홈</router-link>
        <router-link to="/profile">프로필</router-link>
        <router-link to="board-list">보드 리스트</router-link>
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

    data() {
        return {
            navWidth: '178px',
        }
    },

    mounted() {
        this.$nextTick( () => {
            window.addEventListener('resize', this.onResize);
        });
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            this.navWidth = (document.querySelector('.nav-layout').offsetWidth) + 'px';
        }
    },
}
</script>



<style scoped>
.user-home-layout {
    position:relative;
    display:grid;
    grid-template-columns:repeat(14, 1fr);
    grid-template-areas: 'f s';
    grid-column-gap:50px;
}


/*** 메뉴 ***/
.nav-layout {grid-area:f;grid-column-start:1;grid-column-end:4;
    min-height:500px;border-right:thin solid #ddd;}
.nav-layout > a {display:inline-block;width:100%;}
.nav-layout::after {content:" ";display:block;position:absolute;top:0;left:var(--nav-width);
    min-height:500px;border-right:thin solid #fff;}


/*** 내용 ***/
.content-layout {grid-area:s;grid-column-start:4;grid-column-end:15;}
</style>
