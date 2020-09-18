<template>
<layout-default :style="changeBG">
<div class="card-list-wrap">
    <nav class="card-nav-wrap">
    <ul class="card-nav-container card-nav">
        <li>
            <button type="button" class="card-common-btn btn-board-name"><b>보드명</b></button>
        </li>
        <li>
            <button type="button" class="card-common-btn btn-book-mark" title="보드 리스트에서 상단 노출">
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

    props: {
    },

    data() {
        return {
            changeBG: {
                backgroundColor: '',
            },
        }
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


.btn-board-name {margin-right:5px;font-size:15px;background-color:transparent;}

.btn-book-mark::after {content:"★";display:inline;font-weight:bold;}

.btn-team-visible {}

.btn-user-invite {}
</style>
