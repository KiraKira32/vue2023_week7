<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-danger" @click="openModal('create')">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.origin_price }}</td>
          <td>{{ product.price }}</td>
          <td>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <!-- 編輯與刪除 -->
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', product)">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', product)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <product-modal
    :is-new="isNew"
    :temp-product="tempProduct"
    :update-product="updateProduct">
  </product-modal>
  <pagination :pages="page" :get-products="getProducts"></pagination>
  <delete-modal :item="tempProduct" @del-item="deleteProduct"></delete-modal>
</template>

<script>
import { Modal } from 'bootstrap'

import Pagination from '../../components/PaginationElement.vue'
import ProductModal from '../../components/ProductModal.vue'
import DeleteModal from '../../components/DeleteModal.vue'

const apiUrl = import.meta.env.VITE_APP_URL
const apiPath = import.meta.env.VITE_APP_PATH

export default {
  data () {
    return {
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      isNew: false, // 確認編輯或新增使用的
      page: {}
    }
  },
  methods: {
    // 取得產品列表 & page
    getProducts (page = 1) {
      // 參數預設值
      // products 的資料裡面才有 pagination

      const api = `${apiUrl}/v2/api/${apiPath}/admin/products/?page=${page}`
      this.$http
        .get(api)
        .then((res) => {
          this.products = res.data.products
          this.page = res.data.pagination
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // Modal
    openModal (status, product) {
      // 創建產品
      if (status === 'create') {
        this.productModal.show() // 打開 Modal
        this.isNew = true // 新增的品項
        // 帶入初始化資料
        this.tempProduct = {
          imagesUrl: []
        }
      // 編輯產品
      } else if (status === 'edit') {
        this.productModal.show()
        this.isNew = false // 不是新增的
        // 帶入當前要編輯的資料
        this.tempProduct = { ...product }
      // 刪除產品
      } else if (status === 'delete') {
        this.delProductModal.show()
        this.tempProduct = { ...product } // 等等取 id 使用
      }
    },
    // 新增與編輯產品
    updateProduct () {
      let url = `${apiUrl}/v2/api/${apiPath}/admin/product`
      // 用 this.isNew 判斷 API 要怎麼運行
      let method = 'post'

      // 如果不是 creat 而是 edit let的路徑要換掉
      if (!this.isNew) {
        url = `${apiUrl}/v2/api/${apiPath}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }

      this.axios[method](url, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message)
          this.getProducts()
          this.productModal.hide() // 關閉 Modal
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 刪除的功能
    deleteProduct () {
      const url = `${apiUrl}/v2/api/${apiPath}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url)
        .then((res) => {
          alert(res.data.message)
          this.getProducts()
          this.delProductModal.hide()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  components: {
    ProductModal,
    Pagination,
    DeleteModal
  },
  mounted () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    // axios headers (把token送過去)
    this.$http.defaults.headers.common.Authorization = token

    this.getProducts()
    // bootstrap Modal id 名稱
    this.productModal = new Modal('#productModal')
    this.delProductModal = new Modal('#delProductModal')
  }
}
</script>
