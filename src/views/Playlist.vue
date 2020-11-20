<template>
    <div class="mainblock">
      <div class="topline">
        <div class="playlistimage">
          <img v-bind:src="getfullimageurl()" alt="">
        </div>
        <div class="playlisttextinfo">
          <p class="playlistname">
            {{ playlistinfo.playlistname }}
          </p>
          <p v-for="singersname in playlistinfo.singers" v-bind:key="singersname.id">
            {{singersname}}
          </p>
        </div>
      </div>
      <div class="trackline">
        <div v-for="(track, number) in tracksarray" v-bind:key="track.id" class="track">
         <div class="playbutton_small" v-on:click="$store.commit('changeurl', {url: track.filepath, name: track.trackname, singers: track.singer, image: track.singer[0].avatar})"><i class="fa fa-play"></i></div><span class="trackname">{{track.trackname}} - {{number+1}}</span>

<!--          <audio controls v-bind:src="getfulltrackeurl(track.filepath)"></audio>-->
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: "Playlist",
      data(){
          return{
            tracksarray: [],
            playlistinfo: [],
            playlistid: this.$route.query.playlist_id,
          }
      },
      created() {
        this.gettracklist()
        this.getplaylistinfo()
      },
      methods:{
          async gettracklist(){
            this.tracksarray = await axios.get(`${this.$store.getters.getServerUrl}/audio/playlisttracklist/`, {params: {playid: this.$route.query.playlist_id}}).then(response => { return response.data})
          },
          async getplaylistinfo(){
            this.playlistinfo = await axios.get(`${this.$store.getters.getServerUrl}/audio/getplaylistinfo/`, {params: {playid: this.$route.query.playlist_id}}).then(response => {return response.data})
          },
          getfullimageurl(){
            return this.$store.getters.getServerUrl+ this.playlistinfo.image
          },
          getfulltrackeurl(path){
            return this.$store.getters.getServerUrl+ path
          }
      }

    }
</script>

<style scoped>
.topline{
  display: flex;
}
.playlistimage{
  width: 15%;
}
.playlisttextinfo{
  padding-left: 5%;
  width: 85%;
}
.playlistname{
  font-size: 3vw;
}
.playlistimage img{
  width: 100%;
}
.trackline{
  width: 100%;
  padding-top: 100px;
  display: flex;
  flex-wrap: wrap;
}
.track{
  display: flex;
  margin-bottom: 20px;
  border: 2px solid #2c3e50;
  width: 90%;
  height: 40px;
  transition: 2s;
}
.track:hover{
  border: 2px solid #28a745;
  transition: .2s;
}
.playbutton_small{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 3.5%;
  font-size: 1.1rem;
  transition: .16s;
}
.playbutton_small:hover{
  color: #28a745;
  font-size: 1.6rem;
  transition: .16s;
  cursor: pointer;
}
</style>