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
      const width = 800; // Augmenter la largeur pour plus d'espace
      const height = 350;
      const radius = Math.min(width, height) / 2;

      const color = d3.scaleOrdinal(d3.schemeCategory10);
      const svg = d3.select(this.$refs.chart)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 3}, ${height / 2})`); // Décalage du graphique vers la gauche

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
  .text(d => {
    // Vérifier si la population est inférieure à 200 millions
    if (d.data.total_cases < 2000000) {
      return "";  // Ne rien afficher sur le camembert
    } else {
      return `${d.data.country_region} (${d.data.total_cases})`;  // Afficher le nom et le nombre de cas pour les autres
    }
  });

  const legend = svg.append("g")
  .attr("transform", `translate(${radius + 50}, ${-height / 2 + 20})`); // Légende déplacée plus près du graphique

        const legendItems = legend.selectAll(".legend-item")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "legend-item")
  .attr("transform", (d, i) => {
    const row = Math.floor(i / 2); // Pour séparer en 2 colonnes
    const col = i % 2; // Position dans la colonne
    return `translate(${col * 150}, ${row * 25})`; // Augmenter les espacements horizontaux (150) et verticaux (25)
  });


      legendItems.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", (d, i) => color(i));

        legendItems.append("text")
  .attr("x", 20)
  .attr("y", 12)
  .attr("font-size", "12px")
  .attr("fill", "black")
  .text(d => {
    return `${d.country_region} (${d.total_cases})`; // Afficher le nombre de cas actifs dans la légende
  });


    }
  }
};
</script>

<style scoped>
svg {
  display: block;
  margin: 1.5em; /* Ajout de la marge autour du SVG */
}
</style>
