<template>
<section class="add-card-wrap">
    <h1 class="hide">카드 내용 등록</h1>

    <button type="button" class="btn-add-card-content" v-if="isAddCardContentBtn"
        @click.prevent.slef="btnAddCardContent">Add a Card</button>

    <transition name="fade">
    <form class="add-card-content-form" v-if="isAddCardContentForm">
    <fieldset>
        <legend class="hide">카드 내용 입력</legend>

        <input type="text" placeholder="카드 내용 입력" autofocus v-model="card.content">
        <input type="submit" class="btn-reg-card-content" value="Add Card"
            @click.prevent="btnRegCardContent">
        <button type="button" @click.prevent="btnCloseAddCardContentForm()">닫기</button>

    </fieldset>
    </form>
    </transition>


</section>
</template>



<script>
export default {

    name: 'AddCardBtn',

    data() {
        return {

            isAddCardContentBtn: true,
            isAddCardContentForm: false,

            card: {
                content: '',
            },

        }
    },


    methods: {

        btnAddCardContent() {
            this.isAddCardContentBtn = !this.isAddCardContentBtn;
            this.isAddCardContentForm = !this.isAddCardContentForm;
        },

        btnCloseAddCardContentForm(){
            this.card.content = '';
            this.isAddCardContentForm = !this.isAddCardContentForm;
            this.isAddCardContentBtn = !this.isAddCardContentBtn;
        },

        btnRegCardContent(){
            const contet = this.card.content;
            this.btnCloseAddCardContentForm();
            this.$emit('card-content-reg', content);
        },

    },


}
</script>


<style>
.add-card-wrap {position:relative;width:100%;height:100%;border-radius:5px;}


/* 카드 내용 등록 버튼 */
.btn-add-card-content {width:100%;padding:5px;text-align:left;border-radius:3px;background:none;}
.btn-add-card-content:hover {background-color:rgba(0, 0, 0, 0.1);}
.btn-add-card-content::before {content:"+";display:inline;margin-right:5px;}


.fade-enter-active,
.fade-leave-active {
    transition:opacity .3s;
}
.fade-enter,
.fade-leave-to {
    opacity:0;
}


/* 카드 등록 폼 */
.add-card-content-form {}
.add-card-content-form input[type=text]{width:100%;margin-bottom:10px;padding:10px 10px 50px;box-sizing:border-box;
    border-radius:3px;box-shadow:0 1px 1px #aaa;outline:0 none;border:0 none;background:#fff;}

.btn-reg-card-content {margin-right:5px;padding:5px 10px;font-weight:bold;border-radius:2px;color:#fff;background:#5aac44;}
.btn-reg-card-content:hover {background-color:#159320;}

.add-card-content-form button {background:none;}
</style>
