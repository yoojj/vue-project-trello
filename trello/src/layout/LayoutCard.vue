<template>
<layout-default :style="changeBG">
<div class="card-list-wrap">
    <nav class="card-nav-wrap">

    <ul class="card-nav-container card-nav">
        <li>
            <input type="text" class="input-board-name" v-model="board.title"
                v-bind:style="{ width: getInputWidth() }" v-on:keyup.enter="btnBoardNameModify">
        </li>
        <li>
            <button type="button" class="card-common-btn btn-book-mark" title="보드 리스트에서 상단 노출"
                data-star="" @click="btnBookMark">
                <span class="hide">보드 즐겨 찾기</span>
            </button>
        </li>
        <li>
            <v-btn-modal button-name="Team Visible" button-css="card-common-btn btn-team-visible">
            </v-btn-modal>
        </li>
        <li>
            <v-btn-modal button-name="Invite" button-css="card-common-btn btn-user-invite">
            </v-btn-modal>
        </li>
        <li><button type="button" class="card-common-btn btn-close-board"
                @click="btnBoardClose">Close Board</button>
        </li>
    </ul>
    </nav>

    <slot />

</div>
</layout-default>
</template>



<script>
import { LayoutDefault } from '@/layout/'

export default {

    name: 'LayoutCard',

    components: {
        LayoutDefault,
        'v-btn-modal' : () => import('@/components/BtnModal'),
    },

    data() {
        return {

            changeBG: {
                backgroundColor: '',
            },

            star: {
                off: '☆',
                on: '★',
            },

            board: {
                title: '',
                bgcolor: '',
                bookmark: '',
            },

        }
    },

    created() {

        if(this.$store.getters.boardList){

            this.$store.getters.boardList.map( board => {
                if(board.uuid == this.$route.params.uuid)
                    this.board = board;
            });

        } else {

            this.$store.dispatch('BOARD_VIEW', {
                uuid: this.$route.params.uuid,

            }).then( (data) => {
                this.board = data.board;
            });

        }

    },

    watch: {
        'board.title': 'boardNameInput',
        'board.bookmark' : 'boardBookMark',
    },

    methods: {

        getInputWidth(){
            return ((this.board.title.length + 1) * 10) + 'px';
        },

        boardNameInput(){

            const input = document.querySelector('.input-board-name');

            if(input == document.activeElement){
                input.style.width = ((input.value.length + 1) * 10) + 'px';
            }

        },

        btnBoardNameModify(){

            const input = document.querySelector('.input-board-name');
            input.blur();

            this.$store.dispatch('BOARD_MODIFY', {
                uuid: this.$route.params.uuid,
                title: this.board.title,

            }).then( (data) => {
                this.board = data.board;
            });

        },

        boardBookMark(){

            const button = document.querySelector('.btn-book-mark');

            if(this.board.bookmark)
                button.setAttribute('data-star', this.star.on);
            else
                button.setAttribute('data-star', this.star.off);

        },

        btnBookMark(){

            const button = document.querySelector('.btn-book-mark');

            if(button.attributes[2].value == this.star.off){
                button.setAttribute('data-star', this.star.on);
                this.bookMarkModify(true);

            } else {
                button.setAttribute('data-star', this.star.off);
                this.bookMarkModify(false);
            }

        },

        bookMarkModify(bool){

            this.$store.dispatch('BOARD_MODIFY', {
                uuid: this.$route.params.uuid,
                bookmark: bool,

            }).then( (data) => {
                this.board = data.board;
            });

        },

        btnBoardClose(){

            if(confirm('보드를 삭제합니다') == false)
                return false;

            this.$store.dispatch('BOARD_CLOSE', {
                uuid: this.$route.params.uuid,

            }).then( (data) => {

                if(data.result.boolean){
                    alert('보드가 삭제되었습니다.');
                    this.$router.push({ name: 'BOARD_LIST' });
                }

            });

        },

    },

}
</script>



<style>
.card-list-wrap {width:100%;height:100%;background-color:rgba(175, 175, 255, 0.2);}



/***** 카드 메뉴 *****/
.card-nav-wrap {position:relative;padding:10px;box-sizing:border-box;}
.card-nav-container {display:flex;flex-direction:row;}

.card-nav > li:not(:first-child):not(:last-child)::after {content:" ";display:inline-block;width:1px;height:15px;
    margin:0 10px;vertical-align:middle;opacity:.5;border-right:thin solid #fff;}



/*** 버튼 공통 **/
.card-common-btn {padding:8px 10px;color:#fff;border-radius:3px;background-color:rgba(255, 255, 255, 0.2);}
.card-common-btn:hover {background-color:rgba(255, 255, 255, 0.3);}


.input-board-name {margin-right:5px;padding:6px 10px;
    color:#fff;font-weight:600;font-size:16px;
    border-radius:3px;border:0 none;background-color:transparent;}
.input-board-name:hover {background-color:rgba(255, 255, 255, 0.3);}
.input-board-name:focus {color:#333;background:#fff;}

.btn-book-mark::after {content:attr(data-star);display:inline;font-weight:bold;}

.btn-team-visible {}

.btn-user-invite {}

.btn-close-board {position:absolute;right:0;margin-right:10px;background-color:rgba(220, 25, 15, 0.5);}
.btn-close-board:hover {background-color:rgba(220, 25, 15, 0.8);}
</style>
