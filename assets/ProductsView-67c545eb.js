import{_ as h,e as _,r as m,o as a,c as n,d as i,a as t,F as d,f as g,t as b,b as $,w as f}from"./index-583170de.js";const k={data(){return{products:[],loadingStatus:{loadingItem:""},isLoading:!1,product:{}}},components:{RouterLink:_},methods:{getProducts(){this.$http.get("https://vue3-course-api.hexschool.io/v2/api/asher_api/admin/products").then(e=>{this.products=e.data.products,console.log(e)}).catch(e=>{console.log(e)})},addToCart(e,r=1){const c="https://vue3-course-api.hexschool.io/v2/api/asher_api/cart",l={product_id:e,qty:r};this.$http.post(c,{data:l}).then(s=>{alert("商品新增成功")}).catch(s=>{alert(s.response.data.message)})}},mounted(){this.getProducts()}},x={class:"table"},v=["src"],y=t("br",null,null,-1),C=["onClick"];function w(e,r,c,l,s,u){const p=m("router-link");return a(),n(d,null,[i(" 這是產品列表 "),t("table",x,[t("tbody",null,[(a(!0),n(d,null,g(s.products,o=>(a(),n("tr",{key:o.id},[t("td",null,b(o.title),1),t("td",null,[t("img",{src:o.imageUrl,width:"200",alt:"產品圖片"},null,8,v)]),t("td",null,[$(p,{to:`/product/${o.id}`,class:"btn btn-outline-secondary"},{default:f(()=>[i("產品的細節")]),_:2},1032,["to"]),y,t("button",{type:"button",class:"btn btn-outline-primary",onClick:V=>u.addToCart(o.id)},"加入購物車",8,C)])]))),128))])])],64)}const L=h(k,[["render",w]]);export{L as default};