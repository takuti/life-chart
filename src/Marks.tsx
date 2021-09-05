import * as React from 'react';
import { line, curveLinear, select } from 'd3';

export const Marks = ({
  width,
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
          onMouseOver={() => select(".t-" + d.x).classed("hidden", false)}
          onMouseOut={() => select(".t-" + d.x).classed("hidden", true)}
        >
        </circle>
        <g className={"t-" + d.x + " hidden"}>
          <defs>  
            <filter id="svgBlur" x="-20%" y="-20%" width="150%" height="150%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="20"/>
            </filter>
          </defs>
          <rect
            width={width}
            height="3.5em"
            fill="white"
            opacity="0.5"
            y={yScale(yValue(d)) + 20}
            filter="url(#svgBlur)"
          />
          <text
            className="tooltip"
            x={xScale(xValue(d)) + 10}
            y={yScale(yValue(d)) + 40}
          >
            <tspan fontWeight="bold">
              {String(d.x)}
            </tspan>
            <tspan
              dx={(-0.58 * String(d.x).length) + "em"}
              dy="1.6em"
            >
              {d.text}
            </tspan>
          </text>
        </g>
      </a>
    ))}
  </g>
);
