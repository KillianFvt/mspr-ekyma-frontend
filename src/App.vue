<template>
  <div>
    <h1>Dashboard des ventes</h1>
    <BarChart :data="sampleData" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<script setup>
import BarChart from "./components/BarChart.vue";

const sampleData = [
  { month: "Jan", sales: 10 },
  { month: "Feb", sales: 15 },
  { month: "Mar", sales: 8 },
  { month: "Apr", sales: 20 },
  { month: "May", sales: 18 },
  { month: "Jun", sales: 25 }
];
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
