// first chart
// currently NOT in production
const chartOne = d3.csv("data/cleaned/chartone.csv", d => {
  return {
    tier: d["tier"],
    income: +d["income"],
    unemployment: +d["unemployment"],
    life: +d["life"]
  };
});
chartOne.then(d => {
  var svg1 = d3
    .select(firstGraph)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let group1 = svg1.append("g").attr("id", "group1");

  let bars = group1
    .selectAll("g")
    .data(d)
    .enter()
    .append("g")
    .attr("transform", (d, i) => {
      return `translate(0, ${(i * height) / data.length})`;
    })
    .classed("top-green", d => {
      return d.tier == "top";
    })
    .classed("bottom-red", d => {
      return d.tier == "bottom";
    });

  // axis title
  // svg1
  //   .append("text")
  //   .attr("text-anchor", "end")
  //   .text("Ranking")
  //   .attr("x", width * 0.2)
  //   .attr("y", height / 4);

  // text labels on points
  bars
    .append("text")
    .attr("text-anchor", "end")
    .attr("text-transform", "uppercase")
    .attr("font-size", "120%")
    .attr("font-weight", 700)
    .attr("x", width * 0.2)
    .attr("y", (d, i) => {
      return height / 2.5 + i * 100 + 35;
    })
    .text(d => {
      return `${d.tier} 10%`;
    });

  d3.graphScroll()
    .container(d3.select(".container-1"))
    .graph(d3.selectAll("container-1 #graph"))
    .eventId("uniqueId1") // namespace for scroll and resize events
    .sections(d3.selectAll(".container-1 #sections > div"))
    // .offset(innerWidth < 900 ? innerHeight - 30 : 200)
    .on("active", function(i) {
      console.log(i);
      if (i == 1) {
        svg1.selectAll("#titled").remove();
        bars.selectAll("#label").remove();
        bars.selectAll("rect").remove();
        // number format
        let format = d3.format(",d");

        // update title
        svg1
          .append("text")
          .text("Adjusted Net National Income (Current US$)")
          .attr("text-anchor", "middle")
          .attr("x", width / 2)
          .attr("y", 50)
          .attr("id", "titled");

        //update bars
        bars
          .attr("id", "output")
          .append("rect")
          .attr("height", "40px")
          .attr("y", (d, i) => {
            return height / 2.5 + i * 100;
          })
          .attr("x", width * 0.2 + 10)
          .transition()
          .duration(1000)
          .attr("width", (d, i) => {
            return d.income * 0.013;
          });

        // text labels on bars
        bars
          .append("text")
          .attr("id", "label")
          .attr("text-anchor", "start")
          .attr("x", (d, i) => {
            return d.income * 0.013 + (width * 0.2 + 15);
          })
          .attr("y", (d, i) => {
            return height / 2.5 + i * 100 + 35;
          })
          .transition()
          .delay(1000)
          .text(d => {
            return `$${format(d.income)} per capita`;
          });
      } else if (i == 2) {
        svg1.selectAll("#titled").remove();
        bars.selectAll("#label").remove();
        bars.selectAll("rect").remove();
        // number format
        let format = d3.format(".2f");

        // update title
        svg1
          .append("text")
          .text("Unemployment %")
          .attr("text-anchor", "middle")
          .attr("x", width / 2)
          .attr("y", 50)
          .attr("id", "titled");

        //update bars
        bars
          .attr("id", "output")
          .append("rect")
          .attr("height", "10px")
          .attr("y", (d, i) => {
            return height / 3 + i * 100;
          })
          .attr("x", width * 0.2 + 10)
          .transition()
          .duration(1000)
          .attr("width", (d, i) => {
            return d.unemployment * 20;
          });

        // text labels on bars
        bars
          .append("text")
          .attr("id", "label")
          .attr("text-anchor", "start")
          .attr("x", (d, i) => {
            return d.unemployment * 20 + (width * 0.2 + 12);
          })
          .attr("y", (d, i) => {
            return height / 3 + i * 100 + 8;
          })
          .transition()
          .delay(1000)
          .text(d => {
            return `${format(d.unemployment)}%`;
          });
      } else if (i == 3) {
        svg1.selectAll("#titled").remove();
        bars.selectAll("#label").remove();
        bars.selectAll("rect").remove();

        // number format
        let format = d3.format(".2f");

        // update title
        svg1
          .append("text")
          .text("Life Expectancy")
          .attr("text-anchor", "middle")
          .attr("x", width / 2)
          .attr("y", 50)
          .attr("id", "titled");

        //update bars
        bars
          .attr("id", "output")
          .append("rect")
          .attr("height", "10px")
          .attr("y", (d, i) => {
            return height / 3 + i * 100;
          })
          .attr("x", width * 0.2 + 10)
          .transition()
          .duration(1000)
          .attr("width", (d, i) => {
            return d.life * 5;
          });

        // text labels on bars
        bars
          .append("text")
          .attr("id", "label")
          .attr("text-anchor", "start")
          .attr("x", (d, i) => {
            return d.life * 5 + (width * 0.2 + 12);
          })
          .attr("y", (d, i) => {
            return height / 3 + i * 100 + 8;
          })
          .transition()
          .delay(1000)
          .text(d => {
            return `${format(d.life)} years`;
          });
      } else {
        svg1.selectAll("#titled").remove();
        bars.selectAll("#label").remove();
        bars.selectAll("rect").remove();
      }
    });
});
