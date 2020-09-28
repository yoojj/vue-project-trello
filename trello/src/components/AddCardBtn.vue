<template>
<section class="add-card-wrap">
    <h1 class="hide">카드 등록</h1>

    <button type="button" class="btn-add-card"
    @click.prevent.slef="btnAddCard" v-if="isAddCardBtn">Add a Card</button>

    <transition name="fade">
    <form class="add-card-form" v-if="isAddCardForm">
    <fieldset>
        <legend class="hide">카드 제목 입력</legend>
        <input type="text" placeholder="카드 제목 입력" autofocus v-model="card.title">
        <input type="submit" class="btn-reg-card" value="Add list"
            @click.prevent="btnRegCardTitle">
        <button type="button" @click.prevent="btnCloseAddCardForm()">닫기</button>
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

            isAddCardBtn: true,
            isAddCardForm: false,

            card: {
                title: '',
            },

        }
    },


    methods: {

        btnAddCard() {
            this.isAddCardBtn = !this.isAddCardBtn;
            this.isAddCardForm = !this.isAddCardForm;
        },

        btnCloseAddCardForm(){
            this.isAddCardForm = !this.isAddCardForm;
            this.isAddCardBtn = !this.isAddCardBtn;
        },

        btnRegCardTitle(){
            this.$emit('card-method', this.card.title);
        },

    },


}
</script>


<style>
.add-card-wrap {position:relative;width:100%;height:100%;border-radius:5px;}


/* 카드 등록 버튼 */
.btn-add-card {width:100%;padding:10px;color:#fff;font-size:15px;box-sizing:border-box;}
.btn-add-card {border-radius:inherit;background-color:rgba(255, 255, 255, 0.2);}
.btn-add-card::before {content:"+";display:inline;margin-right:5px;font-size:20px;vertical-align:middle;}
.btn-add-card:hover {background-color:rgba(255, 255, 255, 0.3);}

.fade-enter-active,
.fade-leave-active {
    transition:opacity .3s;
}
.fade-enter,
.fade-leave-to {
    opacity:0;
}


/* 카드 등록 폼 */
.add-card-form {position:absolute;top:0;left:0;width:100%;padding:5px;
    border-radius:inherit;box-sizing:border-box;background:#ddd;}
.add-card-form input[type=text] {width:100%;margin-bottom:5px;padding:8px 10px;outline:0 none;
    border:2px solid #0079bf;border-radius:3px;box-sizing:border-box;}

.btn-reg-card {margin-right:5px;padding:5px 10px;font-weight:bold;border-radius:2px;color:#fff;box-shadow:1px 1px #0e773d;background:#5aac44;}
.btn-reg-card:hover {background-color:#159320;}
</style>
