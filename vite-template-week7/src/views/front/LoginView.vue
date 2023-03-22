<template>
  <div class="container text-center">
    <div class="row justify-content-center mt-5">
      <h1 class="h3 mb-3 mt-5 font-weight-normal">管理員登入</h1>
      <div class="col-8 mx-auto col-lg-4">
        <form class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              v-model="user.username"
              id="floatingInput"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              v-model="user.password"
              id="floatingPassword"
              placeholder="Password"
              @click="login"
              required
            />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="d-flex gap-3">
            <button
              class="btn btn-lg btn-outline-danger w-100 mt-3 disabled"
              type="submit"
            >
              忘記密碼
            </button>
            <button class="btn btn-lg btn-danger w-100 mt-3 " type="submit">
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<!-- <template>
  <h4>登入畫面</h4>
  <form class="form-signin" @submit.prevent="login">
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        v-model="user.username"
        id="floatingInput"
        placeholder="name@example.com"
        required
        autofocus
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        v-model="user.password"
        id="floatingPassword"
        placeholder="Password"
        required
      />
      <label for="floatingPassword">Password</label>
    </div>
    <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
      登入
    </button>
  </form>
</template> -->

<script>
export default {
  data () {
    return {
      // 取得使用者的帳號密碼
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const url = `${import.meta.env.VITE_APP_URL}/v2/admin/signin`
      this.$http
        .post(url, this.user)
        .then((res) => {
          const { expired, token } = res.data
          // 存取 cookie
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          alert(res.data.message)
          // 轉網址到指定的頁面
          this.$router.push('/admin/products')
        })
        .catch(() => {
          alert('請輸入正確的帳號與密碼')
        })
    }
  }
}
</script>
