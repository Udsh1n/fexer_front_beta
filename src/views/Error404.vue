<template>
<!--  <div class="error">-->
<!--    <p class="errormess">Error 404</p>-->
<!--    <p class="dne">This page does not exist</p>-->
<!--    <p>Go to <a @click.prevent="$router.push('/')">Main page</a></p>-->
<!--    <p>Go <a @click.prevent="$router.go(-1)">Back</a></p>-->
<!--  </div>-->

<div>
  <v-btn depressed>
      Normal
    </v-btn>
    <v-btn
      depressed
      color="primary"
    ></v-btn>
</div>
</template>

<script>
export default {
name: "Error404"
}
</script>

<style scoped lang="scss">
.error{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .errormess{
    font-size: 5rem;
  }
  .dne{
    font-size: 2.5rem;
  }
}
</style>