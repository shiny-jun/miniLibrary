<template>
    <div>
        <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">获取用户信息</button>
    </div>
</template>
<script>
export default {
    created(){

    },
    methods:{
        onGotUserInfo(e){
            console.log(e.detail.userInfo)
        }
    }
}
</script>
<style>

</style>
