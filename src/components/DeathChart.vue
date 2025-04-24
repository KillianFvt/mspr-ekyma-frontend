<template>
  <div class="chart-container">
    <div ref="chart"></div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "BarChart",
  props: {
    data: Array,
  },
  watch: {
    data: {
      handler() {
        this.drawChart();
      },
      deep: true
    }
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      if (!this.data || this.data.length === 0) return;

      d3.select(this.$refs.chart).selectAll("*").remove();

      const data = [...this.data].sort((a, b) => b.total_deaths - a.total_deaths);
      
      const margin = { top: 30, right: 20, bottom: 80, left: 100 };
      const width = Math.max(800, data.length * 60);
      const height = 400;

      const svg = d3.select(this.$refs.chart)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand()
        .domain(data.map(d => d.country_region))
        .range([0, width])
        .padding(0.3);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.total_deaths)])
        .nice()
        .range([height, 0]);

      const colors = d3.scaleOrdinal()
        .domain(data.map(d => d.country_region))
        .range(d3.schemeCategory10);

      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.country_region))
        .attr("y", height)
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .attr("fill", d => colors(d.country_region))
        .on("mouseover", function () {
          d3.select(this).transition().duration(200).attr("opacity", 0.7);
        })
        .on("mouseout", function () {
          d3.select(this).transition().duration(200).attr("opacity", 1);
        })
        .transition()
        .duration(800)
        .attr("y", d => y(d.total_deaths))
        .attr("height", d => height - y(d.total_deaths));

      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .attr("text-anchor", "end");

      svg.append("g")
        .call(d3.axisLeft(y));

      svg.selectAll("text.label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => x(d.country_region) + x.bandwidth() / 2)
        .attr("y", d => y(d.total_deaths) - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text(d => d.total_deaths);
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  overflow-x: auto;
  padding: 20px;
}

svg {
  display: block;
  margin: auto;
}
</style>
