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
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const data = this.data;
      const total = d3.sum(data, (d) => d.total_cases);
      const width = 500;
      const height = 300;
      const radius = Math.min(width, height) / 2;

      const violetShades = [
        "#E6E6FA", "#D8BFD8", "#DDA0DD", "#DA70D6", "#BA55D3",
        "#9932CC", "#9400D3", "#8A2BE2", "#6A5ACD", "#483D8B",
        "#9370DB", "#7B68EE", "#6B5B95", "#4B0082", "#8E44AD"
      ];
      
      const color = d3.scaleOrdinal(violetShades);
      
      const svg = d3.select(this.$refs.chart)
        .append("svg")
        .attr("width", width)
        .attr("height", height + 50)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const pie = d3.pie().value(d => d.total_cases);
      const arc = d3.arc().innerRadius(0).outerRadius(radius);
      
      const arcs = svg.selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g");

      arcs.append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i));

      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text(d => `${Math.round((d.data.total_cases / total) * 100)}%`);
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
