import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: false,
        showDialog: false,
        scrollTop: 0,
        userInfo: null,
        nowScenic: 0,
        default_avater: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    },
    mutations: {
        setShowDialogStatus: function(state, status) {
            state.showDialog = status;
        },
        setScrollTop: function(state, top) {
            state.scrollTop = top;
        },
        logout: function(state) {
            state.userInfo = null;
            state.isLogin = false;
        },
        login: function(state, data) {
            state.isLogin = true;
            state.userInfo = data;
        }
    },
    actions: {},
    modules: {},

})