<script setup lang="ts">
import { useUserStore } from '@/stores';
import { onMounted, ref,reactive } from 'vue';
import { snackbar } from 'mdui';
import { chpasswd } from '@/services/user';
import { sha256 } from 'js-sha256';
import { useRouter } from 'vue-router';

const user = useUserStore();
const router = useRouter();

const formChangePwd = reactive({
  oldPwd: '',
  newPwd: '',
  rePwd: '',
});

const commandSubmit = () => {
  if (formChangePwd.oldPwd === '') {
    snackbar({
      message: '请输入旧密码',
      placement: 'top',
    });
    return;
  }
  if (formChangePwd.newPwd === '') {
    snackbar({
      message: '请输入新密码',
      placement: 'top',
    });
    return;
  }
  if (formChangePwd.rePwd === '') {
    snackbar({
      message: '请确认新密码',
      placement: 'top',
    });
    return;
  }
  if (formChangePwd.newPwd !== formChangePwd.rePwd) {
    snackbar({
      message: '两次输入的新密码不一致',
      placement: 'top',
    });
    return;
  }
  if (formChangePwd.oldPwd === formChangePwd.newPwd) {
    snackbar({
      message: '新密码不能和旧密码相同',
      placement: 'top',
    });
    return;
  }
  const oldPasswd = sha256(formChangePwd.oldPwd);
  const newPasswd = sha256(formChangePwd.newPwd);
  chpasswd(oldPasswd, newPasswd).then((res) => {
    if (res) {
      snackbar({
        message: '修改密码成功',
        placement: 'top',
      });
      user.logout();
      router.push({ path: '/login' });
    }
  }).catch((err) => {
    if (err.code) {
      snackbar({
        message: `修改密码失败: ${err.msg}`,
        placement: 'top',
      });
    }
  });
};
</script>

<template>
  <div class="container-wrapper">
    <main class="container">
      <h1 class="title">修改密码</h1>
      <form method="dialog" @submit="commandSubmit">
        <span v-if="user.isLogin">已登录: {{ user.profile.name }}</span>
        <p>
          <mdui-text-field type="password" v-model.trim="formChangePwd.oldPwd" toggle-password label="旧密码"></mdui-text-field>
        </p>
        <p>
          <mdui-text-field type="password" v-model.trim="formChangePwd.newPwd" toggle-password label="新密码"></mdui-text-field>
        </p>
        <p>
          <mdui-text-field type="password" v-model.trim="formChangePwd.rePwd" toggle-password label="确认密码"></mdui-text-field>
        </p>
        <p>
          注意: 由于一些特殊的设计，我们并不会检查密码的强度，但是请确保您的密码足够安全。
        </p>
        <mdui-button type="submit">提交</mdui-button>
      </form>
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
