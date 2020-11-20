<template>
  <div id="login">
    <div class="loginform">
        <p class="title">
          Login
        </p>
      <div class="inputs">
        <p class="inputlabel">E-mail or nickname</p>
        <input type="text" id="username">
        <p class="inputlabel">Password</p>
        <input type="password" id="password">
      </div>
      <div class="buttonsloginorreg">
        <button id="loginbutton" v-on:click="LogIn">Login</button>
        <button id="authbutton" v-on:click="$router.go(-1)">Create account</button>
      </div>
      <p>Or login with:</p>
      <span>
        <i class="fa fa-google"></i>
        <i class="fa fa-facebook"></i>
        <i class="fa fa-vk"></i>
        <i class="fa fa-linkedin"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
name: "Login",
  methods:{
    async LogIn(){
      let username = document.getElementById('username').value
      let password = document.getElementById('password').value
      console.log(username, password)
      let query = await fetch(`${this.$store.getters.getServerUrl}/account/login/`,{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      }).then(response=>response.json())
      if (query.code == 0){
        this.$store.dispatch("setCookie", {'name': 'nickname', 'value': username})
        this.$store.dispatch("setCookie", {'name': 'password', 'value': password})
        this.$store.commit('login',{'data': query})
        this.$router.go(-1)
      }
      console.log(query)
    }
  },
  created() {
    this.$store.commit('swapiswritestate', true)
    console.log(this.$store.state.iswrite)
  },
  beforeRouteLeave(to, from, next){
    this.$store.commit('swapiswritestate', false)
    next()
  },
}
</script>

<style lang="scss" scoped>

@import "../assets/scss/variables";

#login{
  background-image: linear-gradient(white, #5ea76f);
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginform{
  width: 20%;
  height: 45vh;
  background-color: $backgroundcolor;
  border-radius: 15px;
  box-shadow: 0px 0px 15px 2px $fexergreen;
  border: 1px solid $maintextcolor;
}
.title{
  width: 100%;
  font-size: 2vw;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #2c3e50;
  padding: 10px 0px 10px 0px;
}
.inputs{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.inputs input{
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: $backgroundcolor;
  border: none;
  border-bottom: 1px solid;
  width: 90%;
  font-size: 20px;
  transition: .16s ease;
  padding: 5px;
}
.inputs input:focus{
  border-bottom: 1px solid $darkergreen;
  transition: .16s ease;
}
.inputlabel{
  width: 95%;
  margin-top: 30px;
}
.buttonsloginorreg{
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.buttonsloginorreg button{
  width: 90%;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  border-radius: 15px;
  height: 45px;
  margin-top: 20px;
  font-size: 20px;
}
#loginbutton{
  border: 1px solid $fexergreen;
}
#loginbutton:hover{
  background-color: $fexergreen;
  cursor: pointer
}
#authbutton{
  border: 1px solid $warning;
}
#authbutton:hover{
  background-color: $warning;
  cursor: pointer;
}
</style>