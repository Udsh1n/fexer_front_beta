<template>
<div id="player">
  <div class="progressbarcontainer" @click="setTime">
    <div class="timenow">{{ currentTime }}</div>
    <div class="progressnow" :style="{width: currentProgressBar+'%'}">
    </div>
  </div>
  <div class="playercontainer">
    <div class="controlbuttons">
      <div class="controlbutton back "><div class="fa fa-fast-backward"></div></div>
      <div title="[Space]" class="controlbutton play_pause " v-on:click="play_pause(trackurl)"><div :class="playicon"></div></div>
      <div class="controlbutton next "><div class="fa fa-fast-forward"></div></div>
    </div>
    <div class="trackinfo">
      <div class="trackimage">
        <img :src="trackpicture" alt="">
      </div>
      <div class="textinfo">
        <a class="tracktitle">{{ trackname }}</a>
        <a class="singers" v-for="h in tracklistsingers" :key="h.link" @click.prevent="GoToSinger(h.link)">{{ h['executor'] }},</a>
      </div>
    </div>
    <div class="playfeatures">
      <i class="fa fa-align-justify list"></i>
      <i v-if="$store.state.isAuth === true" title="[Press F :)]" :class="heartactive" @click="like"></i>
      <i title="[R]" class="fa fa-retweet repeat" :style="{color: isloop}"  @click="loop"></i>
      <i v-if="$store.state.isAuth === true" class="fa fa-ban ban"></i>
      <i title="[M]" :class="volumeicon" v-on:click="mute"></i>
    </div>
  </div>
</div>
</template>

<script>
import store from "@/store";

export default {
name: "player",
  data(){
    return{
      audio: '',
      nowtrackpicture:'',
      playingstate: false,
      duration: 0,
      volume: 0,
      currentTime: '00:00',
      currentProgressBar: 0,
      playicon: 'fa fa-play',
      heartactive: 'fa fa-heart-o',
      volumeicon: 'fa fa-volume-down',
      settimevalue: 0,
      isloop: 'intherit',
      bitrate: 128,
      tracklistexecutors: [],

    }
  },
  computed:{
    trackurl(){
      return this.$store.state.nowsoundurl
    },
    trackname(){
      return this.$store.state.nowsoundtrackname
    },
    tracklistsingers(){
      return this.$store.state.tracklistexecutors
    },
    trackpicture(){
      return this.$store.state.nowsoundpicture
    }
  },
  created() {

  let localThis = this
  document.addEventListener('keyup',function (event){
    if (event.code === 'Space' || event.keyCode == '0x4B'|| event.keyCode == '0x13' && localThis.$store.state.nowplayingstate === true){
      if (store.state.iswrite ===false){
        console.log('Can play stop')
        localThis.play_pause(localThis.trackurl)
      }

    }
    if (event.code === 'KeyM' && localThis.$store.state.nowplayingstate === true && localThis.$store.state.iswrite === false){
      localThis.mute()
    }
    if (event.code === 'KeyR' && localThis.$store.state.nowplayingstate === true && localThis.$store.state.iswrite === false){
      localThis.loop()
    }
    if (event.code === 'KeyF' && localThis.$store.state.nowplayingstate === true && localThis.$store.state.iswrite === false){
      localThis.like()
    }
    //Up arrow
    if (event.keyCode == '0x26' || event.keyCode == '0x6B' && localThis.$store.state.iswrite === false){
      localThis.audio.volume +=0.05
    //Down arrow
    }else if (event.keyCode == '0x28' || event.keyCode == '0x6D' && localThis.$store.state.iswrite === false){
      localThis.audio.volume -=0.05
    //Left arrow
    }else if(event.keyCode == '0x25'){
      localThis.audio.currentTime -=5
    //Right arrow
    }else if(event.keyCode == '0x27' && localThis.$store.state.iswrite === false){
      localThis.audio.currentTime +=5
    //Null, reset time
    }else if(event.keyCode == '0x30' || event.keyCode == '0x60' && localThis.$store.state.iswrite === false){
      localThis.audio.currentTime =0
    }else if(event.keyCode == '0x24' && localThis.$store.state.iswrite === false){
      localThis.$router.push({name: 'Home'}).catch(()=>{});
    }else if(event.keyCode == ' 0x23' && localThis.$store.state.iswrite === false){
      localThis.audio.currentTime = localThis.duration
    }
  })
  },
  mounted() {
        this.$root.$on('component1', () => {
            // your code goes here
            this.play_pause(this.$store.state.nowsoundurl)
        })
    },
  methods:{
  // Processing playing data: Current time, Current position progress bar, Switch audio url, play or pause state
    play_pause(url) {
      if (this.$store.state.nowplayingstate == false) {
        if (this.audio == '') {
          this.audio = new Audio(url)
          console.log('Play audio')
          this.switchstateplaystatus(true)
          let localThis = this
          this.audio.addEventListener("durationchange", function() {
            localThis.trackDuration = Math.round(this.duration);
            localThis.duration = this.duration
          });
          this.audio.addEventListener("ended", function() {

            localThis.audio.currentTime = 0
            localThis.playicon = 'fa fa-play'
            store.commit('changeplaystatus', false)
            // localThis.switchstateplaystatus(false)
          });
          // Return current time
          setInterval(
                  function() {
                    let r =localThis.audio.currentTime
                    let strr = r+''
                    strr = (strr.split('.')[0]/60)
                    //Seconds
                    let getsec = strr+''
                    getsec = getsec.split('.')[1]
                    if (getsec == undefined){
                      getsec = 0
                    }else {
                      if (getsec.split("")[1] != undefined) {
                        getsec = getsec.split("")[0] + getsec.split("")[1]
                      }else{
                        getsec = getsec.split("")[0]+'0'
                      }
                    }
                    let seconds = Math.round(getsec*0.6)
                    if (seconds < 10){
                      seconds = '0'+seconds
                    }
                    //Minutes
                    let minutesstr = r+''
                    minutesstr = minutesstr.split('.')[0]/60
                    minutesstr = minutesstr+''
                    let minutes = minutesstr.split('.')[0]
                    if (minutes < 10){
                      minutes = '0'+minutes
                    }
                    localThis.currentTime = minutes+':'+seconds


                    // Check for change url
                    if (localThis.audio.currentSrc != localThis.trackurl){
                      localThis.audio.setAttribute('src', localThis.trackurl)
                      localThis.audio.load()
                      localThis.audio.play()
                      // localThis.playingstate = true
                      store.commit('changeplaystatus', true)
                      localThis.playicon = 'fa fa-pause'
                    }
                  }.bind(this),
                  250
                );

          //Return current position progress bar
          setInterval(
              function (){
                localThis.currentProgressBar =
                     Math.round(localThis.audio.currentTime / localThis.duration * 100 *100) /100
              }.bind(this), 100
          )
          this.audio.volume = 0.2
          if (this.$store.state.nowsoundurl != ''){
            console.log('not empty audio')
            store.commit('changeplaystatus', true)
            this.audio.play()
            this.playicon = 'fa fa-pause'

          }

        } else if (this.audio.paused == true) {
          if (this.$store.state.nowsoundurl != ''){
            this.audio.play()
            this.playicon = 'fa fa-pause'
            store.commit('changeplaystatus', true)
          }
        }
      } else if (this.$store.state.nowplayingstate == true) {
        this.audio.pause()
        this.playicon = 'fa fa-play'
        store.commit('changeplaystatus', false)
        // console.log('play true', this.$store.state.nowplayingstate)
        // console.log(this.$store.state.nowplayingstate)
      }
    },
    // Mute
    mute(){
      if(this.audio.volume != 0){
        this.volume = this.audio.volume
        this.audio.volume = 0
        this.volumeicon = 'fa fa-volume-off'
      }else{
        this.audio.volume = this.volume
        this.volumeicon = 'fa fa-volume-down'
      }
    },
    // Add to favorite
    like(){
      if (this.heartactive == 'fa fa-heart-o'){
        this.heartactive = 'fa fa-heart'
      }else{
        this.heartactive = 'fa fa-heart-o'
      }

    },
    // Zaloopa
    loop(){
      if (this.audio.loop == false){
        this.audio.loop = true
        this.isloop = '#28a745'
      }else{
        this.audio.loop = false
        this.isloop = "#2c3e50"
      }
    },
    // Count switch time on progress bar
    setTime(e){
      let progressbarwidth = document.querySelector('.progressbarcontainer').offsetWidth
      let clickcoordinate =e.pageX
      this.audio.currentTime = this.duration*(clickcoordinate/progressbarwidth)
    },
    switchstateplaystatus(n){
      this.$store.commit('changeplaystatus', n)

      console.log(this.$store.state.nowplayingstate)
    },
    GoToSinger(slug){
        console.log(slug)
        this.$router.push({path: '/user/'+slug})
        this.$root.$emit('updatecomp')
    },

  }
}
</script>

<style scoped>
#player{
  height: 10vh;
  z-index: 999999;
  display: flex;
  flex-wrap: wrap;
  position: sticky;
  background-color: #424242;
  bottom: 0;
}

p{
  color: #FAFAFA;
}
.progressbarcontainer{
  width: 100%;
  height: 25%;
  background-color: #b8b8b8;
}
.progressnow{
  height: 100%;
  transition: 0.15s;
  background-color: #28a745;
}
.timenow{
  position: absolute;
  vertical-align: bottom;
  margin-left: 1%;
}
.playercontainer{
  display: flex;
  margin-left: 1%;
  width: 98%;
  height: 75%;

}
.controlbuttons{
  width: 10%;
  margin-left: 2%;
  display: flex;

}
.controlbutton{
  height: 100%;
  width: 33.33%;
  align-content: center;
  display: flex;
  justify-content: center;

}
/*.controlbutton:hover p{*/
/*  color: #28a745;*/
/*}*/
.back div, .next div{
  color: #FAFAFA;
  align-self: center;
  font-size: 1.3rem;
  margin-bottom: 0;
  transition: .23s;
}
.back div:hover,.next div:hover{
  align-self: center;
  font-size: 1.5rem;
  margin-bottom: 0;
  color: #28a745;
  cursor: pointer;
  transition: .16s;

}
.play_pause div{
  color: #FAFAFA;
  align-self: center;
  font-size: 1.8rem;
  margin-bottom: 0;
  transition: .23s;
}
.play_pause div:hover{
  font-size: 2.5rem;
  color: #28a745;
  transition: .23s;
  cursor: pointer;
}
.trackinfo{
  width: 60%;
  display: flex;
  flex-wrap: nowrap;
  
}
.trackimage{
  display: flex;
  height: 100%;
  width: 20%;
  padding-left: 5%;
}
.trackimage img{
  height: 80%;
  border-radius: 10%;
  align-self: center;
}
.textinfo{
  height: 75%;
  width: 65%;
  align-self: center;
}
.textinfo p{
  margin-bottom: 0;
}
.tracktitle{
  color: #E0E0E0;
  font-size: 1.3rem;
  display: block;

}
.tracktitle:hover{
  color: #28a745;
}
.singers{
  color: #E0E0E0;
  font-size: 0.8rem;
}
.singers:hover{
  text-decoration: underline;
  color: #28a745;
}
.playfeatures{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 28%;
  text-align: center;
}
.playfeatures i{
  width: 5.6%;
  font-size: 1.2rem;
  transition: .1s;
  color: #E0E0E0;
}
.playfeatures i:hover{
  font-size: 1.5rem;
  transition: .1s;
  color: #28a745;
  cursor: pointer;
}
</style>