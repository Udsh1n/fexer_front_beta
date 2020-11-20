<template>
  <div>
  <div v-if="modeview ==1">
    <div class="container">
      some
    </div>
  </div>
  <div v-else>
    <div class="orga">
      <div class="backgroundimage" :style="{backgroundImage: 'url('+ this.$store.getters.getServerUrl+organizationinfo.org.org_background +')'}"></div>
      <div class="org_title">
        {{ organizationinfo.org.name }}
      </div>
      <div class="org_type">
        {{ organizationinfo.org.org_type }}
      </div>


    </div>
          <div class="titlemembers">
          <p>Members</p>
        </div>
    <div class="membersbox">
        <div class="member" v-for="f in organizationinfo.org.members" :key="f.id">
          <div class="avatar">
            <img :src="$store.getters.getServerUrl+'/media/'+ f.avatar" alt="" height="100px">
          </div>
          <div class="nickname">
            <a v-on:click.prevent="$router.push('/user/'+f.nickname)">{{ f.nickname }}</a>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
name: "Organization",
  data(){
    return{
      organizationinfo: [],
      modeview: 0
    }
  },
  created() {
    if(this.$route.params.name == undefined){
      this.modeview = 1
      this.getallorganizations()
    }else{

      this.getorganizationdetail()
    }
  },
  methods:{
    async getallorganizations(){
      await axios.get(`${this.$store.getters.getServerUrl}/organization/allorganization/`).then(response => { return response.data})
    },
    async getorganizationdetail(){
      this.organizationinfo = await axios.get(`${this.$store.getters.getServerUrl}/organization/getorganizationdetails/`, {params:{slug: this.$route.params.name}}).then(response => { return response.data})
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/variables.scss';
@import '../assets/scss/fonts.scss';

.orga{
  height: 60vh;
}
.backgroundimage{
  height: 100%;
  filter: brightness(30%);
  width: 100%;
  background-position: center;
}
.org_title{
  color: $backgroundcolor;
  position: absolute;
  top: 10vh;
  height: 35%;
  padding-left: 5%;
  display: flex;
  align-items: flex-end;
  font-size: 10rem;
  font-family: 'Montserrat', sans-serif;
}
.org_type{
  position: absolute;
  top: 42vh;
  color: $nonactivelink;
  padding-left: 7%;
  font-size: 3rem;
  text-decoration: underline;
}
.membersbox{
  width: 100%;
  display: flex;
  justify-content: space-around;
  //height: 500px;
}
.member{
  width: 25%;
  height: 100px;
  border: 2px solid $darkergreen;
  display: flex;
  padding: 20px;
  .avatar{
    height: 100%;
    background-size: contain;
    border-radius: 10px 0 0 10px;
    img{
      border-radius: 50%;
    }
  }
  .nickname{
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 30px;
    font-size: 1.5rem;
  }
}
.titlemembers{
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>