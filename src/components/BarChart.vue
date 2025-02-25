<script setup>
import { onMounted, ref } from "vue";
import * as d3 from "d3";
/* eslint-disable */
const props = defineProps({
  data: Array
});

const chartRef = ref(null);

onMounted(() => {
  const svg = d3.select(chartRef.value)
    .append("svg")
    .attr("width", 400)
    .attr("height", 300);

  const xScale = d3.scaleBand()
    .domain(props.data.map(d => d.month))
    .range([0, 400])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(props.data, d => d.sales)])
    .range([300, 0]);

  svg.selectAll("rect")
    .data(props.data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.month))
    .attr("y", d => yScale(d.sales))
    .attr("width", xScale.bandwidth())
    .attr("height", d => 300 - yScale(d.sales))
    .attr("fill", "steelblue");
});
</script>

<template>
  <div ref="chartRef"></div>
</template>
