import {
  select as d3Select,
} from 'd3';
import circularBars from './circular-bars';

export default function() {
  var width = 960;
  var height = 500;
  var config = {
    outerCircle: {
      barWidth: 10,
      barMaxHeight: 100,
      innerCircleRadius: 175,
      className: 'outer-circle',
    },
    innerCircle: {
      barWidth: 5,
      barMaxHeight: 50,
      innerCircleRadius: 50,
      className: 'inner-circle',
    },
  };

  function chart(selection) {
    selection.each(function(data, i) {
      var svg = d3Select(this)
        .selectAll('svg')
        .data([data]);

      var chart = svg.enter().append('svg')
        .attr('width', width)
        .attr('height', height);

      var outerCircle = circularBars()
        .width(width)
        .height(height)
        .barWidth(config.outerCircle.barWidth)
        .barMaxHeight(config.outerCircle.barMaxHeight)
        .growOutwards(true)
        .innerCircleRadius(config.outerCircle.innerCircleRadius)
        .className(config.outerCircle.className);

      var innerCircle = circularBars()
        .width(width)
        .height(height)
        .barWidth(config.innerCircle.barWidth)
        .barMaxHeight(config.innerCircle.barMaxHeight)
        .growOutwards(false)
        .innerCircleRadius(config.innerCircle.innerCircleRadius)
        .className(config.innerCircle.className);

      chart
        .datum(data)
        .call(outerCircle);

      chart
        .datum(data)
        .call(innerCircle);

      var textY = height/2 + config.outerCircle.barMaxHeight + config.outerCircle.innerCircleRadius + 100;
      chart.append('g')
        .attr('transform', 'translate(' + width/2 + ',' + textY + ')')
        .append('text')
        .attr('text-anchor', 'middle')
        .text('Open Knowledge');
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

  return chart;
}
