<template>
<section class="add-card-list-wrap">
    <h1 class="hide">카드 등록</h1>

    <button type="button" class="btn-add-card-list" v-if="isAddCardListBtn"
        @click.prevent.slef="btnAddCardList">Add a Card List</button>

    <transition name="fade">
    <form class="add-card-list-form" v-if="isAddCardListForm">
    <fieldset>
        <legend class="hide">카드 제목 입력</legend>

        <input type="text" placeholder="카드 제목 입력" autofocus v-model="card.title">
        <input type="submit" class="btn-reg-card-list" value="Add list"
            @click.prevent="btnRegCardListTitle">
        <button type="button" @click.prevent="btnCloseAddCardListForm()">닫기</button>

    </fieldset>
    </form>
    </transition>

</section>
</template>



<script>
export default {

    name: 'AddCardListBtn',

    data() {
        return {

            isAddCardListBtn: true,
            isAddCardListForm: false,

            card: {
                title: '',
            },

        }
    },


    methods: {

        btnAddCardList() {
            this.isAddCardListBtn = !this.isAddCardListBtn;
            this.isAddCardListForm = !this.isAddCardListForm;
        },

        btnCloseAddCardListForm(){
            this.card.title = '';
            this.isAddCardListForm = !this.isAddCardListForm;
            this.isAddCardListBtn = !this.isAddCardListBtn;
        },

        btnRegCardListTitle(){
            this.$emit('card-list-reg', this.card.title);
        },

    },


}
</script>


<style>
.add-card-list-wrap {position:relative;width:100%;height:100%;border-radius:5px;}


/* 카드 등록 버튼 */
.btn-add-card-list {width:100%;padding:10px;color:#fff;font-size:15px;box-sizing:border-box;}
.btn-add-card-list {border-radius:inherit;background-color:rgba(255, 255, 255, 0.2);}
.btn-add-card-list::before {content:"+";display:inline;margin-right:5px;font-size:20px;vertical-align:middle;}
.btn-add-card-list:hover {background-color:rgba(255, 255, 255, 0.3);}

.fade-enter-active,
.fade-leave-active {
    transition:opacity .3s;
}
.fade-enter,
.fade-leave-to {
    opacity:0;
}


/* 카드 등록 폼 */
.add-card-list-form {position:absolute;top:0;left:0;width:100%;padding:5px;
    border-radius:inherit;box-sizing:border-box;background:#ddd;}
.add-card-list-form input[type=text] {width:100%;margin-bottom:5px;padding:8px 10px;outline:0 none;
    border:2px solid #0079bf;border-radius:3px;box-sizing:border-box;}

.btn-reg-card-list {margin-right:5px;padding:5px 10px;font-weight:bold;border-radius:2px;color:#fff;box-shadow:1px 1px #0e773d;background:#5aac44;}
.btn-reg-card-list:hover {background-color:#159320;}
</style>
