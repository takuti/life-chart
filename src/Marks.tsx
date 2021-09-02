import * as React from 'react';
import { line, curveLinear, select } from 'd3';

const handleMouseEnter = (id: string, x: number, y: number, text: string) =>
  select("svg")
    .append("text")
    .attr("id", id)
    .attr("class", "tooltip")
    .attr("x", x)
    .attr("y", y)
    .text(text);


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
          onMouseOver={() => handleMouseEnter("t-" + d.x + "-" + d.y, xScale(xValue(d)) + 100, yScale(yValue(d)) + 50, d.text)}
          onMouseOut={() => handleMouseLeave("t-" + d.x + "-" + d.y)}
        >
        </circle>
      </a>
    ))}
  </g>
);
