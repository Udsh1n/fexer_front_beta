<template>
   <section id="indexmainblock" class="mainblock">
     <div class="iflogouted">
        <div class="container">
          <div class="leftblock">
            <p class="motivateText">
              Fexer it is awesome platform for promotion<br>
              your creative works and ideas.<br>
              Also it is great platform for PR for beginner<br>
               and experienced musicians as well as training service.<br>
              You will succeed!
            </p>
          </div>
          <div class="rightblock">

          </div>
        </div>
     </div>
		</section>
</template>

<script>
   import { mapGetters } from 'vuex';
    export default {
       name: "Home",
        computed:{
          ...mapGetters(['getServerUrl']),
        },
       data(){
           return{
              stepsregistration: 1,
           }
       },
       created() {
       },
       methods:{
        Nexta(){
          if (this.stepsregistration ==1){
            if(document.getElementById('name').value!=''&&document.getElementById('lname').value!=''&&document.getElementById('nick').value!=''&&document.getElementById('email').value!=''){
              console.log('filled')
              this.stepsregistration +=1
              console.log(document.getElementById('firstpassword').value)
              console.log(document.getElementById('passwordagain').value = '')
            }else{
              console.log('Заполните все поля')
            }
          }
        }
       },
    }
</script>

<style scoped>
.mainblock {
  width: 100%;
  height: 80vh;
  display: block;
  background-image: linear-gradient(white, #6aff6a);
}
.iflogouted{
  height: 100%;
}
.container{
  width: 90%;
  margin-left: 5%;
  height: 100%;
  display: flex;
}
.motivateText{
  font-size: 2em;
  width: 70%;
  text-align: center;
  margin-left: 15%;
  margin-top: 15%;
}
.rightblock{
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>