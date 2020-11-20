<template>
<div class="trackline">
  <div class="track">
    <div class="playbutton_small" v-on:click="Play($attrs.track.id)">
        <i v-if="$store.state.playstatus == false" class="fa fa-play"></i><i v-else class="fa fa-pause"></i>
    </div>
    <div class="trackname">{{ $attrs.track.trackname }}</div>

    <div class="actions">
      <i v-if="$store.state.isAuth == true" title="Add to favorites" class="fa fa-heart-o"></i>
      <i v-if="$store.state.isAuth == true" title="Ban" class="fa fa-ban"></i>
      <i title="Download" class="fa fa-download"></i>
    </div>

  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: "track",
  methods:{
    async Play(id){

      let getinfo = await axios.get(`${this.$store.getters.getServerUrl}/audio/trackdetail/`, {params:{'id': id}}).then(response => { return response.data})
      this.$store.commit('changeurl', {url: getinfo.track[0].filepath, name: getinfo.track[0].trackname, executors: getinfo.track[0].executors, image: getinfo.track[0].image})
      // console.log(getinfo)
    }
  }
}
</script>
$store.commit('changeurl', {url: '/media/'+$attrs.track.filepath, name: $attrs.track.trackname, singers: ['Udsh1n'], image: '/media/'+$attrs.track.image})
<style scoped>
.trackline{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.track{
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
  margin-bottom: 20px;
  margin-top: 20px;
  border: 1px solid #2c3e50;
  width: 100%;
  height: 40px;
  transition: .2s;
  border-radius: 2px;
}
.track:hover{
  border: 1px solid #28a745;
  transition: .2s;
  box-shadow: 0px 0px 1px 1px #28a745;
}
.playbutton_small{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 40px;
  font-size: 25px;
  transition: .16s;
}
.playbutton_small:hover{
  color: #28a745;
  font-size: 30px;
  transition: .16s;
  cursor: pointer;
}
.trackname{
  display: flex;
  align-items: center;
  text-align: center;
  height: 100%;
}
.actions{
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  flex: 1;
  justify-content: flex-end;
  padding-right: 10px;
}
.actions i{
  transition: .2s ease;
  margin-left: 10px;
}
.actions i:hover{
  color: #28a745;
  cursor: pointer;
  transition: .2s ease;
}
</style>