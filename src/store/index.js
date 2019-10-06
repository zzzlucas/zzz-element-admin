import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        nickname: "Simba"
    },
    mutations: {
        setNickname(state, val) {
            state.nickname = val
        }
    }
})