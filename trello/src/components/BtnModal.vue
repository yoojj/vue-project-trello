<template>
<span class="btn-modal-wrap">
    <button type="button" :class="buttonCss" @click="showModal">{{ buttonName }}</button>

    <v-modal :class="modalCss" v-if="isModalVisible" @close-modal="isModalVisible=false">

        <template slot="modal-title">
            <slot name="title"/>
        </template>

        <template slot="modal-content">
            <slot name="content"/>
        </template>

    </v-modal>
</span>
</template>



<script>
import VModal from '@/components/DefaultModal.vue'

export default {

    name: 'BtnModal',

    components: {
        VModal,
    },

    props: [
        'buttonCss',
        'buttonName',
        'modalCss',
    ],

    data() {
        return {
            isModalVisible: false,
        }
    },

    methods: {
        showModal() {
            this.isModalVisible = !this.isModalVisible;
        },
    },

}
</script>



<style scoped>
.btn-modal-wrap {position:relative;display:inline-block;}
</style>
