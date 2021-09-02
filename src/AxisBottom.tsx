import * as React from 'react';

export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 3,
}: any) =>
  xScale.ticks().map((tickValue: number) => (
    <g
      className="tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <text
        style={{ textAnchor: 'middle' }}
        dy=".71em"
        y={innerHeight + tickOffset}
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
