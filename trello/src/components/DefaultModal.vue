<template>
    <aside class="common-modal-layout common-modal-wrap">
        <h1 class="common-modal-title">
            <slot name="modal-title"/>
        </h1>

        <section class="common-modal-content">
            <slot name="modal-content"/>
        </section>

        <button type="button" class="modal-btn-close" title="close" @click="$emit('close-modal')">
            닫기
        </button>
    </aside>
</template>



<script>
export default {
    name: 'DefaultModal',
}
</script>



<style scoped>
.common-modal-layout {position:absolute;min-width:200px;width:25%;min-height:50%;
    padding:10px 15px;z-index:99999;}
.common-modal-wrap {text-align:left;border:1px solid #ddd;border-radius:5px;
    box-shadow:0 0 8px #bbb;background-color:#fff;}

/* 닫기 버튼 */
.modal-btn-close {position:absolute;top:10px;right:15px;}

/* 모달 제목 */
.common-modal-title {margin-bottom:20px;line-height:2;border-bottom:1px solid #ccc;}

/* 내용 */
.common-modal-content {}
</style>
