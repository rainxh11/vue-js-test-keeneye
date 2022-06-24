import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartArray: new Array(0),
    cart: new Map(),
  },
  getters: {
    getCart(state) {
      return state.cartArray
    },
  },
  mutations: {
    incrementQuantity(state, robotName) {
      const selected = state.cart.get(robotName)
      if (selected.quantity < selected.stock) selected.quantity += 1
      state.cart.set(robotName, selected)
      state.cartArray = Array.from(state.cart.values())
    },
    decrementQuantity(state, robotName) {
      const selected = state.cart.get(robotName)
      selected.quantity -= 1
      if (selected.quantity <= 0) state.cart.delete(robotName)
      else state.cart.set(robotName, selected)

      state.cartArray = Array.from(state.cart.values())
    },
    addRobot(state, robot) {
      if (state.cart.has(robot.name)) {
        const selected = state.cart.get(robot.name)
        console.log('quantity', selected.stock, selected.quantity , robot.quantity)

        if (selected.quantity + robot.quantity <= selected.stock) 
        { 
          selected.quantity += robot.quantity 
        }
        else selected.quantity = selected.stock

        state.cart.set(robot.name, selected)
      } else {
        state.cart.set(robot.name, { quantity: 1, ...robot })
      }
      state.cartArray = Array.from(state.cart.values())
    },
    removeRobot(state, robotName) {
      if (state.cart.has(robotName)) state.cart.delete(robotName)
      state.cartArray = Array.from(state.cart.values())
    },
    clearCart(state) {
      state.cart.clear()
      state.cartArray = Array.from(state.cart.values())
    },
  },
  actions: {},
  modules: {},
})
