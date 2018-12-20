<template>
    <div class="swiper">
        <swiper :indicator-dots="true" indicator-color="#ea5a49" :autoplay="true" interval='4000' duration="1000" :circular="true">
            <div v-for="(top,index) in tops" :key="index">
                        <swiper-item>
                            <img class="slice-image" mode="aspectFill" :src="top.image"/>
                        </swiper-item>
            </div>
        </swiper>
    </div>
</template>
<script>
export default {
    props:['tops']
}
</script>
<style lang="scss" scoped>

</style>

