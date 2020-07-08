import Vue from 'vue';
import {
    Message
} from 'element-ui';
import Router from 'vue-router';
import store from '../store/index'
import index from '@/views/index';
import about from '@/views/about';
import home from '@/views/home';
import user from '@/views/user';
import login from '@/views/login';
import scenic from '@/views/scenic';
import introduction from '@/views/introduction';
import travels from '@/views/travels';
import addtravels from '@/views/addtravels';
import travelsDetail from '@/views/travelsDetail';
import admin from '@/views/admin';
Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index,
        }, {
            path: '/about',
            name: 'about',
            component: about,
        }, {
            path: '/home',
            name: 'home',
            component: home,
        }, {
            path: '/user/:id',
            name: 'user',
            component: user,
            beforeEnter: (to, from, next) => {
                if (!(store.state.isLogin || localStorage.getItem("apollo-token"))) {
                    next({
                            name: 'login'
                        })
                        // Message({
                        //     showClose: true,
                        //     message: '请先登录！',
                        //     type: 'error'
                        // });
                } else next()
            }
        }, {
            path: '/user/login',
            name: 'login',
            component: login,
        }, {
            path: '/scenic',
            name: 'scenic',
            component: scenic,
        }, {
            path: '/introduction',
            name: 'introduction',
            component: introduction,
        }, {
            path: '/travels',
            name: 'travels',
            component: travels,
        }, {
            path: '/addtravels',
            name: 'addTravels',
            component: addtravels,
        }, {
            path: '/travelsdetail/:id',
            name: 'travelsdetail',
            component: travelsDetail,
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin,
            beforeEnter: (to, from, next) => {
                if (!(store.state.isLogin && store.state.userInfo.isAdmin) && from == "admin") {
                    Message({
                        showClose: true,
                        message: '您非管理无权使用！',
                        type: 'error'
                    });
                } else next()
            }
        },
    ],
});