<template>
<layout-default>
    <div class="common-content-wrap" :style="{height:`calc(100% - ${headerHeight}px)`}">
        <div class="common-content-layout">

        <slot />

        </div>
    </div>
</layout-default>
</template>



<script>
import { LayoutDefault } from '@/layout/'

export default {

    name: 'LayoutContent',

    components: {
        LayoutDefault,
    },

    data() {
        return {
            headerHeight: '',
        }
    },

    mounted() {
        this.headerHeight =
            document.getElementsByClassName('common-header-layout')[0].offsetHeight;
    },

}
</script>



<style>
.common-content-wrap {width:100%;background:#f5f5f5;overflow-y:scroll;}
.common-content-layout {width:80%;margin:50px auto 50px;}
</style>
