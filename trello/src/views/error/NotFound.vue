<template>
<layout-content>
    <section class="error-404">
        <h2>Page not found</h2>
        <p>{{ $t('error.404') }}</p>
    </section>
</layout-content>
</template>



<script>
import { LayoutContent } from '@/layout/'

export default {

    name: 'NotFound',

    components: {
        LayoutContent,
    },

}
</script>



<style scope>
.error-404 {text-align:center;}
.error-404 h2 {margin-bottom:25px;}
</style>
