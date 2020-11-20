<template>
    <div class="container">
      <div class="row">
        <div class="singerinfo">
          <div class="leftside">
            <img :src="$store.getters.getServerUrl+singersarray[0].avatar" alt="">
          </div>
          <div class="rightside">
            <p class="singername">{{singersarray[0].namesinger}}</p>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Singer",
      data(){
        return{
          singersarray: [],
        }
      },
      created() {
          this.getsingerinfo()
      },
      methods: {
        async getsingerinfo(){
            this.singersarray = await axios.get(`${this.$store.getters.getServerUrl}/singers`, {params: {singer_slug: this.$route.query.singer_slug}}).then(response => { return response.data})
        },


      }
    }
</script>

<style scoped>
.container{
  width: 90%;
  margin-left: 5%;
}
.singerinfo{
  display: flex;
  width: 100%;
}
.singerinfo .leftside{
  width: 20%;
}
.singerinfo .leftside img{
  margin-top: 20px;
  width: 100%;
  border-radius: 50%;
  box-shadow: 0px 0px 15px 5px #2c3e50;
  transition: .16s;
  filter: contrast(120%)
}
.singerinfo .leftside img:hover{
  margin-top: 20px;
  width: 100%;
  border-radius: 50%;
  box-shadow: 0px 0px 15px 10px #2c3e50;
  transition: .16s;
}
.singerinfo .rightside{
  width: 80%;
}
.singername{
  color: #2c3e50;
  font-size: 3em;
  padding-left: 50px;
  padding-top: 1%;
}
</style>