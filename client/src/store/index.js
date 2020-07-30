import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)
import axios from 'axios'
import Swal from 'sweetalert2'
export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    carts: []
  },
  mutations: {
    login(state, payload) {
      state.isLogin = true
      router.push({name: 'Home'})
    },
    logout(state, payload) {
      localStorage.clear()
      state.isLogin = false
      router.push({name: 'Home'})
    },
    fetchProducts(state, payload) {
      state.products = payload
      console.log(this.state.products, `state`)
      //router.push({name: 'Home'})
    },
    fetchCart(state,payload) {
      state.carts = payload
      console.log(state.carts)
      //router.push({ name: 'Cart'})
    },
    updateCart(state,payload) {
      state.carts.push(payload)
    },
    loggedIn(state,payload) {
      state.isLogin = true
      // router.push({name: 'Home'})
    },
    loggedOut(state,payload) {
      state.isLogin = false
      router.push({name: 'Home'})
    }
  },
  actions: {
    toCheckout(context,payload) {
      router.push({name: 'Cart'})
      console.log('tes')
    },
    toHome(context,payload) {
      router.push({name: 'Home'})
    },
    toRegister(context,payload) {
      router.push({name: 'Register'})
    },
    toLogin(context,payload) {
      router.push({name: 'Login'})
    },
    login(context,payload) {
      console.log(payload, `masuk sini`)
      axios({
        url: 'http://localhost:3000/login',
        method: 'post',
        data: payload
      })
      .then(({data}) => {
        console.log(data, `<<<<<`)
        localStorage.setItem('token', data.token)
        localStorage.setItem('Email', payload.email)
        context.commit('login', data)
      })
      .catch(err => {
        console.log(err, 'error')
      })
    },
    register(context,payload) {
      axios({
        url: 'http://localhost:3000/register',
        method: 'post',
        data: payload
      })
      .then(({data}) => {
        console.log(data, `<<<<<`)
        router.push({name: 'Login'})
      })
      .catch(err => {
        console.log(err, 'error')
      })
    },
    logout(context, payload) {
      context.commit('logout', payload)
    },
    fetchProducts(context, payload) {
      console.log('store <<<')
      axios({
        url: 'http://localhost:3000/product',
        method: 'get',
      })
      .then(({ data }) => {
        console.log(data, `<<< ini dari vuex`)
        context.commit('fetchProducts', data.products)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addToCart(context, payload) {
      axios({
        url: `http://localhost:3000/product/${payload}`,
        method: 'POST',
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        context.dispatch('fetchCart', data.cart)
        Swal.fire(
          'Added!',
          'Product added to cart.',
          'success'
        )
      })
      .catch(err => {
        console.log(err.response.data.error[0], `<<<<`)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error[0]
        })
      })
    },
    fetchCart(context, payload) {
      axios({
        url: `http://localhost:3000/cart`,
        method: 'get',
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        console.log(data.carts, `<<< ini dari fetch Cart vuex`)
        context.commit('fetchCart', data.carts)
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error[0]
        })
        router.push({name: 'Home'})
      })
    },
    addQuantity(context,payload) {
      axios({
        url: `http://localhost:3000/cart/${payload}/add`,
        method: 'put',
        headers: {
          token: localStorage.token
        } 
      })
      .then(({data}) => {
        console.log('added')
        context.dispatch('fetchCart')
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error[0]
        })
      })
    },
    subtractQuantity(context,payload) {
      axios({
        url: `http://localhost:3000/cart/${payload}/subtract`,
        method: 'put',
        headers: {
          token: localStorage.token
        } 
      })
      .then(({data}) => {
        console.log('subtracted')
        context.dispatch('fetchCart')
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error[0]
        })
      })
    },
    removeProduct(context, payload) {
      axios({
        url: `http://localhost:3000/cart/${payload}`,
        method: 'delete',
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        //context.commit('removeFavorite', payload)
        context.dispatch('fetchCart')
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error[0]
        })
      })
    },
    loginCheck(context, payload) {
      if (localStorage.token) {
        context.commit('loggedIn')
      } else {
        context.commit('loggedOut')
      }
    },
    checkout(context,payload){
      
      console.log(payload, `here`)
      axios({
        url: 'http://localhost:3000/cart/checkout',
        method: 'put',
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        console.log(data, `here in store`)
        Swal.fire(
          'Success!',
          'Checkout Success.',
          'success'
        )
        context.dispatch('fetchCart')
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error[0]
        })
      })
    }

  },
  modules: {
  }
})
