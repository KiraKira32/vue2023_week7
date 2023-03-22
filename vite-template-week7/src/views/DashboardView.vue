<template>
  <header class="py-2 text-white bg-dark align-">
    <div class="container-fluid">
      <nav
        class="d-flex flex-wrap align-items-center
              justify-content-center
              justify-content-lg-start
              "
      >
        <router-link class="navbar-brand mx-3" to="/admin">後台</router-link>
          <ul class="nav col-12 col-lg-auto me-lg-auto justify-content-center mb-md-0">
            <li class="nav-item admin-block" :class="{ active: $route.path === '/admin/products' }" >
              <router-link class="nav-link admin-link px-2" to="/admin/products">產品管理</router-link>
            </li>
            <li class="nav-item admin-block" :class="{ active: $route.path === '/admin/orders' }">
              <router-link class="nav-link admin-link px-2" to="/admin/orders">訂單管理</router-link>
            </li>
            <li class="nav-item admin-block" :class="{ active: $route.path === '/admin/coupon' }">
              <router-link class="nav-link admin-link px-2" to="/admin/coupon">優惠卷管理</router-link>
            </li>
            <li class="nav-item admin-block" :class="{ active: $route.path === '/admin/article' }">
              <router-link class="nav-link admin-link px-2" to="/admin/article">貼文管理</router-link>
            </li>
          </ul>
        <!-- 登出的功能 -->
        <div class="d-flex text-end align-items-center">
          <router-link class="nav-link admin-link px-2 me-3"  to="/">返回前台</router-link>
          <button type="button" class="btn btn-outline-light" @click.prevent="logout">帳號登出</button>
        </div>
      </nav>
    </div>
  </header>
  <RouterView></RouterView>
</template>

<script>
// 在主板頁面匯入 RouterView 頁面
import { RouterView } from 'vue-router'

export default {
  data () {
    return {
      isLogin: false,
      disabled: true
    }
  },
  component: {
    RouterView
  },
  methods: {
    // 登出 清空帳號資料
    logout () {
      // 清除 cookie
      document.cookie = `hexToken=; expires=${new Date()};`
      alert('帳號已登出')
      this.$router.push('/login')
    },
    // 驗證
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.$http.defaults.headers.common.Authorization = token

      if (!token) {
        alert('請登入帳號')
        this.$router.push('/login')
      }

      const url = `${import.meta.env.VITE_APP_URL}/api/user/check`
      this.$http
        .post(url)
        .then((res) => {
          this.isLogin = true
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  // 觸發
  mounted () {
    this.checkLogin()
  }
}
</script>
