import * as React from 'react';
import { line, curveLinear, select } from 'd3';

const handleMouseEnter = (id: string, x: number, y: number, text1: string, text2: string) =>
  select("svg")
    .append("text")
    .attr("id", id)
    .attr("class", "tooltip")
    .attr("x", x)
    .attr("y", y)
    .text(text1)
    .append("tspan")
    .attr("dx", (-0.5 * text1.length) + "em")
    .attr("dy", "1.6em")
    .text(text2);


const handleMouseLeave = (id) => 
  select("#" + id).remove();

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
          onMouseOver={() => handleMouseEnter("t-" + d.x + "-" + d.y, xScale(xValue(d)) + 100, yScale(yValue(d)) + 50, d.x as string, d.text)}
          onMouseOut={() => handleMouseLeave("t-" + d.x + "-" + d.y)}
        >
        </circle>
      </a>
    ))}
  </g>
);
