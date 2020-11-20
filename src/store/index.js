import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        backendurl: 'http://127.0.0.1:8000',
        playstatus: false,
        nowsoundurl: '',
        nowsoundtrackname: '',
        tracklistexecutors: [],
        nowplayingstate: false,
        nowsoundpicture: '',
        isAuth: false,
        userAvatar: '',
        userdata: '',
        iswrite: false,
    },
    mutations: {
        changeurl(state, n){
            state.nowsoundtrackname = n.name
            state.nowsoundurl = state.backendurl + n.url
            state.tracklistexecutors = n.executors
            state.nowsoundpicture = state.backendurl+n.image
        },
        login(state, n){
            console.log(n.data)
            state.isAuth = true
            state.userdata = n.data
            console.log('swith to true is Auth')
        },
        changeplaystatus(state, n){
            state.nowplayingstate = n
        },
        swapiswritestate(state, is){
            state.iswrite = is
        }
    },
    actions: {
        setCookie(state, n) {
            console.log(n.name)
            document.cookie = n.name + "=" + n.value+";SameSite=Lax";
            this.state.isAuth = true
        },
        async getCookie() {
            let username = document.cookie.match("(^|;) ?" + 'nickname' + "=([^;]*)(;|$)");
            let password = document.cookie.match("(^|;) ?" + 'password' + "=([^;]*)(;|$)");
            if (username[2]!=null, password[2]!=null) {
                let user = await fetch(this.state.backendurl+'/account/login/', {
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username[2],
                        password: password[2]
                    })
                }).then(response=>response.json())
                if (user.code == 0){
                    this.state.isAuth = true
                    this.state.userdata = user
                }
            }
        },
        deleteCookie() {
            let date = new Date();
            date.setTime(date.getTime() - 1);
            document.cookie = "nickname" + "=; expires=" + date.toGMTString();
            document.cookie = "password" + "=; expires=" + date.toGMTString();
            this.state.isAuth = false
            console.log(this.state.isAuth)
        },
    },
    modules: {

    },
    getters: {
        getServerUrl: state =>{
            return state.backendurl
        }
    },
})

export default store