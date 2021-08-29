import { line, curveLinear } from 'd3';

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipValue,
  circleRadius,
}) => (
  <g className="marks">
    <path
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveLinear)(data)}
    />
    {data.map((d) => (
      <a href={d.link}>
        <circle
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={circleRadius}
        >
          <title>{tooltipValue(d)}</title>
        </circle>
      </a>
    ))}
  </g>
);
