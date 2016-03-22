import {
  select as d3Select,
  scaleLinear as d3ScaleLinear,
  max,
} from 'd3';

export default function() {
  var xScale = d3ScaleLinear();
  var width = 960;
  var height = 500;
  var barHeight = 20;

  function okLogo(selection) {
    selection.each(function(data, i) {
      xScale
        .domain([0, max(data)])
        .range([0, width]);

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
        .attr('height', barHeight - 1);
    });
  }

  return okLogo;
};
