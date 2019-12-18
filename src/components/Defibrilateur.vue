<template>
  <div class="header">
    <img src="../../public/Assets/defibrillatorWhite.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Defibrilateur',
  props: {
    facil: String,
    enantes: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  background: rgb(174, 231, 108);
  padding: 0;
  height: 160px;
  width: 160px;
  z-index: 9999;
  position: absolute;
  bottom : 40px;
  right: 40px;
  border-radius: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header img{
  height: 80%;
  width: 80%;
  display: flex;
}

h1{
  margin: 0px;
  height: 100%;
  color: #F18C00;
}

.facil{
  color: #007BC1;
  margin-right: 5px;
}

</style>
