<template>
<div>
  <div v-if="contenttype === 'Audio'">
    <v-card
      elevation="8"
      class="audio"
      dark
      v-for="track in audio.tracks" :key="track.id"
    >
      <v-card-title>
      <v-btn width="42px" height="42px" icon @click="Play(track.id)">

        <v-icon v-if="$store.state.nowplayingstate === true && $store.state.nowsoundtrackname === track.trackname" style="font-size: 2.5rem">mdi-pause</v-icon><v-icon style="font-size: 2.5rem" v-else>mdi-play</v-icon>
      </v-btn>
        <p class="trackname">{{track.trackname}}</p><p class="trackauthor"></p>

        <v-spacer></v-spacer>
      <v-btn width="42px" height="42px" icon>
        <v-icon style="font-size: 1.4rem">mdi-playlist-music</v-icon>
      </v-btn>

      <v-btn width="42px" height="42px" icon>
        <v-icon style="font-size: 1.4rem" >mdi-heart-outline</v-icon>
      </v-btn>

      <v-btn width="42px" height="42px" icon>
        <v-icon style="font-size: 1.4rem">mdi-download</v-icon>
      </v-btn>
      </v-card-title>
    </v-card>
  </div>

  <div v-if="contenttype === 'Video'">
    <div class="videos">
      <video id="uservideo" v-for="videoitem in uservideos['videos']" :key="videoitem.id" controls :src="$store.state.backendurl+'/media/'+ videoitem.videopath">
      </video>
    </div>
  </div>

  <div v-if="contenttype === 'Liked songs'">
    <v-card
      elevation="8"
      class="audio"
      dark
      v-for="track in audio.likedsongs" :key="track.id"
    >
      <v-card-title>
      <v-btn width="42px" height="42px" icon @click="Play(track.id)">

        <v-icon v-if="$store.state.nowplayingstate === true && $store.state.nowsoundtrackname === track.trackname" style="font-size: 2.5rem">mdi-pause</v-icon><v-icon style="font-size: 2.5rem" v-else>mdi-play</v-icon>
      </v-btn>
        <p class="trackname">{{track.trackname}}</p><p class="trackauthor"></p>

        <v-spacer></v-spacer>
      <v-btn width="42px" height="42px" icon>
        <v-icon style="font-size: 1.4rem">mdi-playlist-music</v-icon>
      </v-btn>

      <v-btn width="42px" height="42px" icon>
        <v-icon style="font-size: 1.4rem" >mdi-heart-outline</v-icon>
      </v-btn>

      <v-btn width="42px" height="42px" icon>
        <v-icon style="font-size: 1.4rem">mdi-download</v-icon>
      </v-btn>
      </v-card-title>
    </v-card>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
name: "dashboardcontent",
  data(){
    return{

    }
  },
  props: ['contenttype', 'audio', 'userid', 'uservideos'],
  mounted() {
  },
  methods:{
    async Play(id){
      this.$root.$emit('component1')
      let getinfo = await axios.get(`${this.$store.getters.getServerUrl}/audio/trackdetail/`, {params:{'id': id}}).then(response => { return response.data})
      this.$store.commit('changeurl', {url: getinfo.track[0].filepath, name: getinfo.track[0].trackname, executors: getinfo.track[0].executors, image: getinfo.track[0].image})
      // console.log(getinfo)
    },

  }
}
</script>

<style scoped>
p{
  margin: 0;
  padding: 0;
}

.audio{
  width: auto;
  margin-bottom: 20px;
}
.trackname{
  height: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0;
  margin-left: 15px;
}

.videos{
  width: 90%;
  display: flex;
  flex-wrap: wrap;
}
#uservideo{
  width: 40%;
  min-width: 100px;
  margin-left: 5%;
}
</style>