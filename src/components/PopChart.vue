<template>
    <div ref="chart"></div>
  </template>
  
  <script>
  import * as d3 from "d3";
  
  export default {
    name: "ScatterPlot",
    props: {
      data: Array,
    },
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart() {
        const width = 1000;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 60, left: 70 };
        
        const svg = d3.select(this.$refs.chart)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
        const x = d3.scaleLinear()
          .domain([0, d3.max(this.data, d => d.population)])
          .nice()
          .range([0, width]);
        
        const y = d3.scaleLinear()
          .domain([0, d3.max(this.data, d => d.total_cases)])
          .nice()
          .range([height, 0]);
        
        svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));
        
        svg.append("g")
          .call(d3.axisLeft(y));
        
        svg.append("text")
          .attr("x", width / 2)
          .attr("y", height + 40)
          .attr("text-anchor", "middle")
          .style("font-size", "12px")
          .text("Population");
        
        svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("x", -height / 2)
          .attr("y", -50)
          .attr("text-anchor", "middle")
          .style("font-size", "12px")
          .text("Nombre de cas");
        
        svg.selectAll("circle")
          .data(this.data)
          .enter()
          .append("circle")
          .attr("cx", d => x(d.population))
          .attr("cy", d => y(d.total_cases))
          .attr("r", 5)
          .attr("fill", "#4A90E2");
      }
    }
  };
  </script>
  
  <style scoped>
  svg {
    display: block;
    margin: auto;
  }
  </style>
  