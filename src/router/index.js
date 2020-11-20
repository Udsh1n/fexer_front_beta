import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Playlist from "../views/Playlist";
import Singer from "../views/Singer"
import adminpage from "@/views/adminpage";
import User from "@/views/User";
import Login from "@/views/Login";
import Organization from "@/views/Organization";
import Error404 from "@/views/Error404";

Vue.use(VueRouter)

const routes=[
        {
            path: '*',
            name: 'Error404',
            component: Error404
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            params: true,
        },
        {
            path: '/playlist',
            name: 'Playlist',
            component: Playlist,
            params: true
        },
        {
            path: '/singer',
            name: 'Singer',
            component: Singer,
            params: true
        },
        {
            path: '/admin',
            name: 'Admin',
            component: adminpage,
            params: true
        },
        // {
        //     path: '/user/',
        //     name: 'Users',
        //     component: User,
        //     params: true,
        //
        // },
        {
            path: '/user/:nickname/',
            name: 'User',
            component: User,
            params: true
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            params: true
        },
        {
            path: '/organization/',
            name: 'organizations',
            component: Organization,
            params: true
        },
        {
            path: '/organization/:name',
            name: 'organization',
            component: Organization,
            params: true
        },
    ]

const router = new VueRouter({
    mode: 'history',
    routes,
})
export default router