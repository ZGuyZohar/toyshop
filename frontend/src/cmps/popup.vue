<template>
    <section class="pop-up">
        <div class="header">
            <slot name="header">    </slot><span @click="closePopup">X</span>
        </div>
        <slot></slot>
        <slot name="footer"></slot>
    </section>  
</template>

<script>
export default {
    methods: {
        closePopup(){
            this.$emit('closePopup', false)
        }
    }
}
</script>