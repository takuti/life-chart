import * as React from 'react';

export const AxisLeft = ({
  yScale,
  innerWidth,
  tickOffset = 3,
}: any) =>
  yScale.ticks().map((tickValue: number) => (
    <g
      className="tick"
      transform={`translate(0,${yScale(tickValue)})`}
    >
      <line x2={innerWidth} />
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        x={-tickOffset}
        y={(tickValue)}
        dy=".32em"
      >
        {tickValue}
      </text>
    </g>
  ));
