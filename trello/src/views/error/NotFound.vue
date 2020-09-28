<template>
<layout-content>
<section class="error-404-wrap">
    <h1>Page not found</h1>

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



<style>
.error-404-wrap {}
.error-404-wrap h1 {margin-bottom:30px;text-align:center;}
.error-404-wrap p {text-align:center;}
</style>
