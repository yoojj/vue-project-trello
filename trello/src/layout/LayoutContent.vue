<template>
<layout-default>
    <div class="common-content-wrap" :style="{height:`calc(100% - ${headerHeight}px)`}">
        <div class="content-layout">

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
            headerHeight : '',
        }
    },

    mounted() {
        this.headerHeight =
            document.getElementsByClassName('common-header-layout')[0].offsetHeight;
    },

}
</script>



<style scoped>
.common-content-wrap {width:100%;background-color:#f5f5f5;overflow-y:scroll;}

.content-layout {width:80%;margin:50px auto 0;}
</style>
