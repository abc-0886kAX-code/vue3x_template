<!--
 * @FilePath: \vue3x_template\src\pages\NotPage\not-page.vue
 * @Author: maggot-code
 * @Date: 2022-11-21 15:16:40
 * @LastEditors: zhangxin
 * @LastEditTime: 2024-01-03 10:42:02
 * @Description:
-->
<script setup>
const { proxy } = getCurrentInstance()
function gobackHome() {
  proxy.$router.push({ name: 'home' })
}
</script>

<template>
  <div class="not-page">
    <img src="@/assets/images/404.svg" alt="">
    <div class="not-page-text">
      抱歉，您访问的页面不存在。
    </div>
    <div class="not-page-btn">
      <el-button size="small" type="primary" @click="gobackHome">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-text {
    color: #909399;
    font-size: 14px;
  }

  &-btn {
    margin-top: 20px;
  }
}

img {
  width: 350px;
}
</style>
