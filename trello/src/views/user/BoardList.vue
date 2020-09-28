<template>
<layout-user>
    <section class="board-list-wrap">
        <h1 class="">보드 리스트</h1>

        <section class="create-board-wrap">
            <h2>Create Board</h2>
            <v-btn-modal button-name="Create new board" button-css="vbtn-create-board"
                modal-css="vmodal-create-board">
                <template slot="title">보드 생성</template>
                <template slot="content">
                    <form class="create-board-form" @submit.prevent="createBoardForm">
                    <fieldset>
                        <legend class="hide">보드 생성</legend>

                        <label for="boardTitle" class="hide">보드 제목 입력</label>
                        <input type="text" id="boardTitle" v-model="board.title">

                        <input type="submit" class="btn-create-board-disabled" value="Create Board"
                          :class="{ 'btn-create-board-submit' : isBoardTitle }"
                          :disabled="!isBoardTitle">

                    </fieldset>
                    </form>
                </template>
            </v-btn-modal>
        </section>

        <section class="board-view-wrap">
            <h2>Board View</h2>
            <ul class="board-list">
                <li v-for="board in boardList">
                    <router-link :to="{ name: 'CARD_LIST', params: { bno: board.bno } }">
                        {{ board.title }}
                    </router-link>
                </li>
            </ul>
        </section>

    </section>
</layout-user>
</template>



<script>
import { mapState, mapGetters } from 'vuex'
import { LayoutUser } from '@/layout/'

export default {

    name: 'BoardList',

    components: {
        LayoutUser,
        'v-btn-modal': () => import('@/components/BtnModal'),
    },

    data() {
        return {
            board: {
                bno: '',
                title: '',
            },

            boardList: null,
        }
    },

    beforeCreate() {
        if(this.$store.getters.boardList == null) {
            this.$store.dispatch('BOARD_LIST'
            ).then( (data) => {
                this.boardList = data;
            });
        }
    },

    created() {
        this.boardList = this.$store.getters.boardList;
    },

    computed: {
        isBoardTitle(){
            return this.board.title;
        },
    },

    methods: {

        createBoardForm() {
            this.$store.dispatch('BOARD_WRITE', {
                title: this.board.title,

            }).then( (data) => {

                this.$store.dispatch('BOARD_LIST').then( () => {
                    this.$router.push({ name: 'CARD_LIST', params: { bno: data.board.bno }});
                });

            }).catch( err => {
                alert(err);
            });
        },

    },
}
</script>



<style>
.board-list-wrap {}
.board-list-wrap h1 {margin-bottom:50px;}
.board-list-wrap h2 {margin-bottom:5px;font-size:18px;}


/*** 보드 생성 ***/
.create-board-wrap {margin-bottom:50px;}
.create-board-wrap h2::before {content:"◎";display:inline;margin-right:5px;}

/* 보드 생성 버튼 */
.vbtn-create-board {width:175px;padding:25px;border-radius:3px;}
.vbtn-create-board:hover {background-color:rgba(0, 0, 0, 0.2);}


/* 보드 생성 모달 */
.vmodal-create-board {position:fixed !important;top:15%;left:50%;width:300px;
    min-height:100px !important;margin-left:-150px;}

.vmodal-create-board > .modal-title {position:fixed;top:-1px;left:-1px;width:1px;height:1x;
    font-size:1px;line-height:1px;overflow:hidden;}
.vmodal-create-board > .modal-btn-close {margin-top:38px;padding:9px !important;}

.create-board-form {}
.create-board-form input[type=text] {width:100%;margin-bottom:10px;padding:5px;box-sizing:border-box;}

.btn-create-board-disabled {padding:10px 15px;border-radius:5px;cursor:default;background:#eee;}
.btn-create-board-submit {font-weight:bold;color:#fff;cursor:pointer;background:#5aac44;}


/*** 보드 목록 ***/
.board-view-wrap {}
.board-view-wrap h2::before {content:"◎";display:inline;margin-right:5px;}

/* 보드 리스트 */
.board-list {overflow:hidden;}
.board-list > li {width:22%;max-width:175px;margin-right:10px;margin-bottom:10px;text-align:center;
    border-radius:3px;background:#e5e5e5;float:left;}
.board-list > li a {display:inline-block;width:100%;padding:25px;box-sizing:border-box;
    text-overflow:ellipsis;overflow:hidden;}
.board-list > li a:hover {background-color:rgba(0, 0, 0, 0.1);}
</style>
