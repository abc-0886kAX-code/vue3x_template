<!--
 * @FilePath: \vue3x_template\src\layout\login\login.vue
 * @Author: zhangxin
 * @Date: 2023-04-12 10:51:30
 * @LastEditors: zhangxin
 * @LastEditTime: 2024-01-03 10:43:36
 * @Description:https://element-plus-admin.cn/assets/login-box-bg-fec91044.svg
-->
<script setup>
import { uuid } from '@/shared/uuid.js'
import { useUserStore } from '@/store/useUser'

const { proxy } = getCurrentInstance()
const user = useUserStore()

const loginForm = ref(null)
const form = ref({
  username: 'admin',
  userpwd: '123456',
})

const rules = {
  username: [
    {
      required: true,
      message: '账号不可为空',
      trigger: 'blur',
    },
  ],
  userpwd: [
    {
      required: true,
      message: '密码不可为空',
      trigger: 'blur',
    },
  ],
}

function logon() {
  unref(loginForm).validate(async (valid) => {
    if (!valid)
      return
    user.setupToken(uuid())
    proxy.$router.push({ name: 'home' })
  })
}
</script>

<template>
  <div class="login">
    <div class="login-introduce">
      <div class="login-introduce-logo">
        <img src="@/assets/images/logo.png" alt="">
      </div>
      <div class="login-introduce-content">
        <div class="login-introduce-content-image">
          <img src="@/assets/images/login.svg" alt="">
        </div>
        <div class="login-introduce-content-label">
          欢迎使用本系统
        </div>
        <div class="login-introduce-content-desc">
          基于VUE3.X实现客户端开发平台
        </div>
      </div>
    </div>
    <div class="login-console">
      <div class="login-console-control">
        CONTROL
      </div>
      <div class="login-console-body">
        <div class="login-console-body-label">
          登录
        </div>
        <el-form
          ref="loginForm" class="login-console-body-form" label-position="top" label-width="80px"
          :model="form" :rules="rules"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" type="text" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码" prop="userpwd">
            <el-input v-model="form.userpwd" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="logon">
              登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%">
              注册
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;

  &-introduce,
  &-console {
    width: 50%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
  }

  &-introduce {
    background-color: #353e54;
    color: #fff;

    &-logo {
      height: 50px;
      width: 120px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &-content {
      width: 100%;
      height: calc(100% - 50px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &-image {
        width: 350px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;

        &::after {
          content: '';
          height: 150%;
          width: 25px;
          background: #fff;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          opacity: 0.6;
          filter: blur(6px);
          animation: move 1s infinite ease-out;
        }
      }

      &-label {
        font-size: 20px;
        font-weight: bold;
      }

      &-desc {
        margin-top: 20px;
        font-size: 14px;
      }
    }
  }

  &-console {
    &-control {
      width: 100%;
      font-size: 18px;
      font-weight: bold;
      height: 50px;
      display: flex;
      justify-content: end;
    }

    &-body {
      height: calc(100% - 50px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 500px;
      padding: 20px;
      box-sizing: border-box;
      margin: auto;

      &-label {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
}

@keyframes move {
  0% {
    transform: translate(-200px, -200px) rotate(45deg);
  }

  100% {
    transform: translate(200px, 200px) rotate(45deg);
  }
}
</style>
