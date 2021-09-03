import * as React from 'react';
import { line, curveLinear, select } from 'd3';

const handleMouseEnter = (cls: string, x: number, y: number, text1: string, text2: string) => {
  const g = select("svg")
    .append("g")
    .attr("class", cls);
  g.append("rect")
    .attr("width", 0.7 * Math.max(text1.length, text2.length) + "em")
    .attr("height", 50)
    .attr("fill", "white")
    .attr("opacity", 0.5)
    .attr("x", x - 10)
    .attr("y", y - 20)
    .attr("rx", 15)
    .attr("ry", 15);
  g.append("text")
    .attr("class", "tooltip")
    .attr("x", x)
    .attr("y", y)
    .text(text1)
    .append("tspan")
    .attr("dx", (-0.53 * text1.length) + "em")
    .attr("dy", "1.6em")
    .text(text2);
};


const handleMouseLeave = (cls) => 
  select("." + cls).remove();

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  circleRadius,
}: any) => (
  <g className="marks">
    <path
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveLinear)(data) as string}
    />
    {data.map((d: any) => (
      <a href={d.link}>
        <circle
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={circleRadius}
          onMouseOver={() => handleMouseEnter("t-" + d.x, xScale(xValue(d)) + 100, yScale(yValue(d)) + 60, d.x as string, d.text)}
          onMouseOut={() => handleMouseLeave("t-" + d.x)}
        >
        </circle>
      </a>
    ))}
  </g>
);
