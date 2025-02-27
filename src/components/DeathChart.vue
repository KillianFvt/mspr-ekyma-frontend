<template>
    <div ref="chart"></div>
  </template>
  
  <script>
  import * as d3 from "d3";
  
  export default {
    name: "BarChart",
    props: {
      data: Array,
    },
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart() {
        const data = [...this.data].sort((a, b) => b.total_death - a.total_death);
        const width = 500;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 50, left: 60 };
        
        const svg = d3.select(this.$refs.chart)
          .append("svg")
          .attr("width", width)
          .attr("height", height + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
        const x = d3.scaleBand()
          .domain(data.map(d => d.country_region))
          .range([0, width])
          .padding(0.2);
        
        const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.total_death)])
          .nice()
          .range([height, 0]);
        
        const colors = d3.scaleOrdinal()
          .domain(data.map(d => d.country_region))
          .range(["#4CAF50", "#66BB6A", "#81C784", "#A5D6A7", "#C8E6C9", "#2E7D32"]);
        
        svg.append("g")
          .selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", d => x(d.country_region))
          .attr("y", d => y(d.total_death))
          .attr("width", x.bandwidth())
          .attr("height", d => height - y(d.total_death))
          .attr("fill", d => colors(d.country_region));
        
        svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));
        
        svg.append("g")
          .call(d3.axisLeft(y));
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