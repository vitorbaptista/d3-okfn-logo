import {
  select as d3Select,
  scaleLinear as d3ScaleLinear,
  max,
} from 'd3';

export default function() {
  var xScale = d3ScaleLinear();
  var width = 960;
  var height = 500;
  var barWidth = 20;
  var barMaxHeight = 200;
  var innerCircleRadius = 100;

  function chart(selection) {
    selection.each(function(data, i) {
      xScale
        .domain([0, max(data)])
        .range([innerCircleRadius, innerCircleRadius + barMaxHeight]);

      var svg = d3Select(this)
        .selectAll('svg')
        .data([data]);

      var chart = svg.enter().append('svg')
        .attr('width', width)
        .attr('height', height);

      var barGroup = chart.append('g')
        .attr('transform', 'translate(480, 250)');

      var bar = barGroup.selectAll('g')
          .data(data)
        .enter().append('g')
          .attr('transform', function(d, i) {
            return 'rotate(' + i * (360 / data.length) + ')';
          });

      bar.append('rect')
        .attr('width', xScale)
        .attr('height', barWidth - 1);

        console.log(innerCircleRadius);
      barGroup.append('circle')
        .attr('r', innerCircleRadius)
        .attr('fill', 'white');
    });
  }

  chart.width = function(_) {
    if (!arguments.length) { return width; }
    width = _;
    return chart;
  }

  chart.height = function(_) {
    if (!arguments.length) { return height; }
    height = _;
    return chart;
  }

  chart.barWidth = function(_) {
    if (!arguments.length) { return barWidth; }
    barWidth = _;
    return chart;
  }

  chart.barMaxHeight = function(_) {
    if (!arguments.length) { return barMaxHeight; }
    barMaxHeight = _;
    return chart;
  }

  chart.innerCircleRadius = function(_) {
    if (!arguments.length) { return innerCircleRadius; }
    innerCircleRadius = _;
    return chart;
  }

  return chart;
};

