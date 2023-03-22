<template>
  <header class="py-2 text-white header-block">
    <div class="ontainer-fluid">
      <nav
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-star t"
      >
        <router-link
          to="/"
          class="text-end navbar-brand align-items-center mb-lg-0 me-lg-auto"
        >
          <h1 class="mx-3">LOGO</h1>
        </router-link>
        <div class="flex-row-reverse">
          <ul
            class="text-align nav col-12 col-lg-auto me-lg-auto justify-content-center mb-md-0"
          >
            <li class="nav-item" :class="{ active: $route.path === '/' }">
              <router-link
                class="nav-link front-link px-2 front-link--color"
                to="/"
                >首頁</router-link
              >
            </li>
            <li class="nav-item" :class="{ active: $route.path === '/about' }">
              <router-link
                class="nav-link front-link px-2 front-link--color"
                to="/about"
                >關於</router-link
              >
            </li>
            <li
              class="nav-item"
              :class="{ active: $route.path === '/products' }"
            >
              <router-link
                class="nav-link front-link px-2 front-link--color"
                to="/products"
                >產品</router-link
              >
            </li>
            <li class="nav-item" :class="{ active: $route.path === '/cart' }">
              <router-link
                class="nav-link front-link px-2 front-link--color"
                to="/cart"
                >購物車</router-link
              >
            </li>
          </ul>
        </div>
        <!-- 後台管理員位置暫時放在這裡 -->
        <button type="button" class="mx-3 px-2 py-2 btn btn-outline-light">
          <router-link class="nav-link" to="/admin">後台管理</router-link>
        </button>
      </nav>
    </div>
  </header>
  <RouterView></RouterView>
</template>

<!-- <template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">LOGO</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link"> 購物車 </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">後台登入</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template> -->
<script>
// 在主板頁面匯入 RouterView 頁面
import { RouterView } from 'vue-router'
export default {
  component: {
    RouterView
  }
}
</script>
