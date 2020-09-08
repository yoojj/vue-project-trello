<template>
<div class="common-wrap common-wrap-bg">
    <header class="common-header-layout">

        <h1 class="common-header-title">
            <router-link to="/">trello</router-link>
        </h1>

        <nav class="common-header-nav-search" v-if="isUserLogin">
            <router-link to="/" class="header-btn-round-square">홈</router-link>

            <v-btn-modal button-name="보드 리스트" button-css="header-btn-round-square"
                modal-css="board-list-modal">
                <template slot="title">보드 리스트</template>
                <template slot="content">

                </template>
            </v-btn-modal>

            <span class="search-card-wrap">
                <label for="searchCard">
                    <span class="hide">카드 검색</span>
                </label>
                <input type="text" class="input-search-card" id="searchCard" v-model="searchWord"
                    @focus="searchInputFocus=true" @blur="searchInputFocus=false" @keyup.enter="btnSearchCard">
                <button type="button" class="btn-search-card" :class="{ btnSearchCardActive : searchInputFocus}"
                    @mousedown="btnSearchCard">검색</button>
            </span>
        </nav>

        <nav class="common-header-nav-profile" v-if="isUserLogin">
            <v-btn-modal button-name="알림" button-css="header-btn-round-square" modal-css="notice-modal">
                <template slot="title">알림</template>
                <template slot="content">
                </template>
            </v-btn-modal>

            <v-btn-modal :button-name="userName" button-css="btn-user-name" modal-css="profile-modal">
                <template slot="title">프로필</template>
                <template slot="content">
                    <router-link :to="{ name: 'profile'}">profile</router-link>
                    <button type="button" @click="btnUserLogout">로그아웃</button>
                </template>
            </v-btn-modal>
        </nav>

    </header>

    <slot />

</div>
</template>



<script>
export default {

    name: 'LayoutDefault',

    components: {
        'v-btn-modal': () => import('@/components/BtnModal'),
    },

    data() {
        return {
            searchInputFocus: false,
            searchWord: '',
        }
    },

    computed: {
        // 임시
        isUserLogin(){
            return  this.$user;
        },
        userName(){
            return this.$user.name ? this.$user.name.charAt(0).toUpperCase() : 'U' ;
        },
    },


    methods: {

        btnSearchCard() {
            if(!this.searchWord) {
                alert('검색어를 입력하세요.');
            } else {
                this.$router.push('/search?word=' + this.searchWord);
            }
        },

        btnUserLogout() {
            this.$store.dispatch('LOGOUT'
            ).then( data => {
                location.href = '/logout';
            }).catch( err => {
                alert(err);
            });
        },

    },

}
</script>



<style>
.common-wrap {width:100%;height:100%;}
.common-wrap-bg {background:#026aa7;}


/***** 공통 버튼 *****/
.header-btn-round-square {display:inline-block;padding:10px;color:#fff;font-weight:bold;font-size:14px;
    border-radius:2px;background-color:rgba(255, 255, 255, 0.3);}
.header-btn-round-square:hover {background-color:rgba(255, 255, 255, 0.2);}


/***** 헤더 *****/
.common-header-layout {
    display:grid;
    grid-template-columns:repeat(14, 1fr);
    grid-template-areas:'f s t';
    padding:5px;
    box-sizing:border-box;
}


/*** 로고 ***/
.common-header-title {grid-area:s;grid-column-start:7;grid-column-end:9;}
.common-header-title {text-align:center;font-size:30px;font-family:Helvetica, sans-serif;}
.common-header-title a {color:#fff;opacity:.5;transition: opacity .3s;}
.common-header-title a:hover {opacity:1;}


/*** 왼쪽 메뉴 ***/
.common-header-nav-search {grid-area:f;grid-column-start:1;grid-column-end:6;}
.common-header-nav-search > a,
.common-header-nav-search > span {margin-right:5px;}

/* 보드 리스트 모달 */
.board-list-modal {top:50px;}

/* 검색 */
.search-card-wrap {position:relative;display:inline-block;width:50%;
    border-radius:2px;}

.input-search-card {display:inline-block;width:75%;padding:11px;
    outline:0 none;border:0 none;box-sizing:border-box;border-radius:2px;
    background-color:rgba(255, 255, 255, 0.3);transition: width .2s;}
.input-search-card:hover {background-color:rgba(255, 255, 255, 0.5);}
.input-search-card:focus,
.input-search-card:active {width:100%;background:#fff;}

.btn-search-card {position:absolute;top:2px;right:30%;padding:8px 3px;color:#fff;
    border-radius:50px;background:transparent;transition: right .2s;z-index:1;}

.btnSearchCardActive {right:2%;color:#333;background:#f5f5f5;}
.btnSearchCardActive:hover {background:#e5e5e5;}


/*** 오른쪽 메뉴 ***/
.common-header-nav-profile {grid-area:t;grid-column-start:14;grid-column-end:15;}

/* 알림 모달 */
.notice-modal {top:50px;right:0;}

/* 유저 버튼 */
.btn-user-name {margin-left:5px;padding:11px 14px;font-weight:bold;border-radius:20px;}
.btn-user-name:hover {background-color:rgba(255, 255, 255, 0.5);}

/* 프로필 모달 */
.profile-modal {top:50px;right:0;}
</style>
