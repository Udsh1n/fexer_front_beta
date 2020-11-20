<template>


  <v-app-bar
    absolute
    fixed
    dark

    >
      <v-toolbar-title class="Fexer" @click="$router.push('/')"> Fexer</v-toolbar-title>

    <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn @click="$router.push('/user/'+$store.state.userdata.userdata.slug+'/')" v-if="$store.state.isAuth" icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn v-else @click="$router.push({name: 'Login'})">
        <v-icon>mdi-location-enter</v-icon>
      </v-btn>
    </v-app-bar>

</template>

<script>
    export default {
        name: "navbar",
      data(){
        return{
          dropdownmenuvisible:false
        }
      },
      created() {

      },
      methods:{
            GOTO(place){
              this.$router.push({name: place})
            },
            FexerSearch() {
              let text = document.getElementById('searchinput').value
              if (text == ''){
                console.log('none text')
              }else{
                console.log(text)
              }
            },
            switchdropdownmenuvisible(){
              this.dropdownmenuvisible = !this.dropdownmenuvisible
            },
          logout(){
            this.$store.dispatch('deleteCookie')
          }
        },
      mounted() {
        document.getElementById('search').addEventListener('keydown', function(e){
          if (e.keyCode ==13){
            this.FexerSearch()
          }
        })
      }
    }
</script>

<style scoped lang="scss">
.Fexer{
  font-size: 1.5rem;
  &:hover{
    cursor: pointer;
  }
}

</style>