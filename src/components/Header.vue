<template>
  <div class="header">
    <h1 class="facil">{{ facil }}</h1>
    <h1>{{ enantes }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    facil: String,
    enantes: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  background: lightgray;
  margin: 0px;
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 20px
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
