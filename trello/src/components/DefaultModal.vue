<template>
    <aside class="common-modal-wrap common-modal-layout">
        <h1 class="common-modal-title modal-title">
            <slot name="modal-title" />
        </h1>

        <section class="common-modal-content modal-content">
            <slot name="modal-content"/>
        </section>

        <button type="button" class="common-modal-btn-close modal-btn-close"
            title="close" @click="$emit('close-modal')">닫기</button>

    </aside>
</template>



<script>
export default {
    name: 'DefaultModal',
}
</script>



<style>
.common-modal-wrap {display:inline-block;border:thin solid #ccc;box-sizing:border-box;
    border-radius:5px;box-shadow:0 0 15px -5px #333;background:#fff;}

.common-modal-layout {position:absolute;min-width:300px;min-height:300px;
    padding:10px 15px;box-sizing:border-box;z-index:99999;}

/* 닫기 버튼 */
.common-modal-btn-close {position:absolute;top:12px;right:15px;padding:5px;
    border-radius:3px;box-sizing:border-box;background:#e5e5e5;}
.common-modal-btn-close:hover {background:#c5c5c5;}

/* 제목 */
.common-modal-title {margin-bottom:25px;line-height:2;border-bottom:thin solid #ccc;}

/* 내용 */
.common-modal-content {}
</style>
