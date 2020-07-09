<template>
<span style="display:inline-block;">
    <button type="button" :class="btnCss" @click="showModal">{{ buttonName }}</button>

    <v-modal :class="this.parentClass" v-if="isModalVisible" @close-modal="isModalVisible=false">

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
        'parentClass',
        'btnCss',
        'buttonName'
    ],

    data() {
        return {
            isModalVisible: false,
        }
    },

    methods: {
        showModal() {
            this.isModalVisible = true;
        },
    },
    
}
</script>
