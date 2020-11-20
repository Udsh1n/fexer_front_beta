<template>
  <div style="display: flex">
    <div :style="{height: height+'px'}">
      <v-navigation-drawer
      style="height: 100%;"
            dark
      permanent>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Account
            </v-list-item-title>
            <v-list-item-subtitle  style=" color: #2E7D32;">
              {{ infouser.nickname }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
              dense
              nav
            >
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
               @click="switchcontent(item.statekeyword, item.title)">
                <v-list-item-icon>
                  <v-icon v-if="item.title === visiblecontent" style=" color: #2E7D32;">{{ item.icon }}</v-icon>
                  <v-icon v-else>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-if="item.title === visiblecontent" style=" color: #2E7D32;">{{ item.title }}</v-list-item-title>
                  <v-list-item-title v-else>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

        <template v-slot:append>
              <div class="pa-2">
                <v-btn block @click="$store.dispatch('deleteCookie')">
                  Logout
                </v-btn>
              </div>
            </template>

        <v-spacer></v-spacer>
      </v-navigation-drawer>
    </div>
    <v-main class="customcontent" style="padding: 1%; background-color: #424242">
      <p class="visiblecontentname">{{visiblecontent}}</p>

      <div class="contentdata">
        <div class="topline" v-if="visiblecontent === 'Dashboard'">
          <v-card v-for="item in toplineitems" :key="item.id" @click="visiblecontent = item"
              class="toplinecard"
            elevation="6"
            outlined
              color="grey darken-4 "
          >
            <v-card-title style="color: white">{{ item }}</v-card-title>
          </v-card>
        </div>
        <div class="cont">
          <dashboardcontent :contenttype="visiblecontent" :audio = "usertracks" :userid="infouser.id" :uservideos="uservideos">

          </dashboardcontent>
        </div>
      </div>



    </v-main>
  </div>
</template>

<script>
import axios from "axios";
import Dashboardcontent from "@/components/dashboardcontent";
// import Track from "@/components/track";

export default {
name: "User",
  data(){
    return{
      items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', statekeyword: 'dshbrd' },
          { title: 'Audio', icon: 'mdi-music-box', statekeyword: 'msc' },
          { title: 'Playlists', icon: 'mdi-playlist-music', statekeyword: 'pllsts' },
          { title: 'Video', icon: 'mdi-filmstrip-box', statekeyword: 'vd' },
          { title: 'Sheet music files', icon: 'mdi-file-music', statekeyword: 'shtmscfls' },
          { title: 'Liked songs', icon: 'mdi-heart', statekeyword: 'lkdsngs' },
          { title: 'Following', icon: 'mdi-human-male', statekeyword: 'fllwng' },
          { title: 'Followers', icon: 'mdi-human-male-male', statekeyword: 'fllwrs' },
        ],
      toplineitems: ['Audio', 'Video', 'Playlists', 'Sheet music files'],
      infouser: [],
      usertracks: [],
      height: 0,
      visiblecontent: 'Dashboard',
      visiblecontentkeyword: 'dshbrd',
      uservideos: '',
    }
  },
  created() {
    this.getheight()
    console.log(this.$store.state)
  },
  updated() {
  },
  mounted() {
    this.getuser();
    this.$root.$on('updatecomp', () => {
            // your code goes here
            this.getuser()
        })
  },
  methods:{
    async getuser(){
      this.infouser = await axios.get(`${this.$store.getters.getServerUrl}/account/user/`, {params: {nick: this.$route.params.nickname}}).then(response => { return response.data})
      this.getusertracks()
    },
    async getusertracks(){
      this.usertracks = await axios.get(`${this.$store.getters.getServerUrl}/audio/usertracks/`,{params: {id: this.infouser.id}}).then(response => { return response.data})
      this.getuservideos()
    },
    async getuservideos(){
      this.uservideos = await axios.get(`${this.$store.getters.getServerUrl}/video/getuservideos/`,{params: {id: this.infouser.id}}).then(response => { return response.data})
      console.log('query')
    },
    // calcultatecss(){
    //   console.log('height')
    //   let widthavatar = document.getElementById('avatar').clientWidth
    //   console.log(widthavatar)
    //   document.getElementById('avatar').setAttribute('style', 'height: '+widthavatar+'px; background-image: url("'+this.$store.getters.getServerUrl+this.infouser.avatar+'")')
    // },
    bindiconsocset(g){
      return 'fa fa-'+g
    },
    getheight(){
      let clientheight = window.innerHeight
      this.height = clientheight*0.9-64
    },
    switchcontent(keyword,word){
      this.visiblecontentkeyword = keyword
      this.visiblecontent = word
    }

  },
  components:{
    Dashboardcontent
    // Track,
  }
}
</script>

<style scoped lang="scss">
p{
  color: #FAFAFA;
}
.visiblecontentname{
  font-size: 1.5rem;
  width: 100%;
}
.customcontent{
  display: flex;
}
.contentdata{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.topline{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.toplinecard{
  display: flex;
  justify-content: center;
  min-width: 20%;
  &:hover{
    cursor: pointer;
  }
}
.cont{
  width: 95%;
  margin-top: 30px;
  padding: 1%;
}
</style>