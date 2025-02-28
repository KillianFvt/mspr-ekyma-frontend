<template>
  <div ref="chart"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "PieChart",
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

      const data = this.data;
      const total = d3.sum(data, (d) => d.total_cases);
      const width = 500;
      const height = 350;
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal(d3.schemeCategory10);
      const svg = d3.select(this.$refs.chart)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const pie = d3.pie().value(d => d.total_cases);
      const arc = d3.arc().innerRadius(0).outerRadius(radius);
      const arcLabel = d3.arc().innerRadius(radius * 0.6).outerRadius(radius * 0.9);

      const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");

      arcs.append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .on("mouseover", function () {
          d3.select(this).transition().duration(200).attr("opacity", 0.7);
        })
        .on("mouseout", function () {
          d3.select(this).transition().duration(200).attr("opacity", 1);
        });

      arcs.append("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text(d => `${d.data.country_region} (${Math.round((d.data.total_cases / total) * 100)}%)`);
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
