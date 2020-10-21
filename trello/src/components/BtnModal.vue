<template>
<span class="vbtn-modal-wrap">

    <button type="button" :class="buttonCss" @click="showModal">{{ buttonName }}</button>

    <v-modal :class="modalCss" v-if="isModalVisible" @close-modal="isModalVisible=false">

        <template slot="modal-title">
            <slot name="title" />
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
        'button-css',
        'button-name',
        'modal-css',
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



<style>
.vbtn-modal-wrap {position:relative;display:inline-block;width:inherit;}
</style>
