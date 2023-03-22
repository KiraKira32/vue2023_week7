<template>
  <div class="container">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="order in orders" :key="order.id">
          <tr v-if="orders.length" :class="{ 'text-secondary': !order.is_paid }">
            <td>
              {{
                $moment(new Date(order.create_at * 1000)).format(
                  'YYYY-MM-DD HH:mm'
                )
              }}
            </td>
            <td><span v-text="order.user.email" v-if="order.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in order.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ order.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  role="switch"
                  :id="order.id"
                  v-model="order.is_paid"
                  @change="updatePaid(order)"
                />
                <label class="form-check-label" :for="order.id">
                  <span v-if="order.is_paid">已付款</span>
                  <span v-else class="text-muted">未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal('view', order)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openModal('delete', order)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <order-modal
    :temp-order="tempOrder"
    @update-paid="updatePaid"
    ref="orderModal"
  ></order-modal>
  <delete-modal :item="tempOrder" @del-item="deleteOrder"></delete-modal>
  <pagination :pages="pagination" @emitPages="getOrdersList"></pagination>
</template>

<script>
import { Modal } from 'bootstrap'
import DeleteModal from '../../components/DeleteModal.vue'
import Pagination from '../../components/PaginationElement.vue'
import OrderModal from '../../components/OrderModal.vue'

const apiUrl = import.meta.env.VITE_APP_URL
const apiPath = import.meta.env.VITE_APP_PATH

export default {
  data () {
    return {
      orders: [],
      isNew: false,
      pagination: {},
      tempOrder: {},
      page: 1
    }
  },
  components: {
    DeleteModal,
    Pagination,
    OrderModal
  },
  methods: {
    // 取得產品訂單列表
    getOrdersList (page = 1) {
      this.page = page
      const url = `${apiUrl}/v2/api/${apiPath}/admin/orders/?page=${page}`
      this.$http
        .get(url, this.tempProduct)
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // Modal
    openModal (status, order) {
      if (status === 'view') {
        this.orderModal.show()
        this.tempOrder = { ...order }
        // 刪除產品
      } else if (status === 'delete') {
        this.deleteModal.show()
        this.tempOrder = { ...order }
      }
    },
    // 更新付款狀態
    updatePaid (item) {
      this.isLoading = true
      const api = `${apiUrl}/v2/api/${apiPath}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.$http.put(api, { data: paid }).then((res) => {
        this.orderModal.hide()
        this.getOrdersList(this.page)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 刪除訂單資料
    deleteOrder () {
      const url = `${apiUrl}/v2/api/${apiPath}/admin/order/${this.tempOrder.id}`
      this.$http
        .delete(url)
        .then((res) => {
          alert(res.data.message)
          this.deleteModal.hide()
          this.getOrdersList(this.page)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = token

    this.getOrdersList()

    this.orderModal = new Modal('#orderModal')
    this.deleteModal = new Modal('#delProductModal')
  }
}
</script>
