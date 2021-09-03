import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  scaleLinear,
  scaleTime,
  extent,
  timeFormat
} from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';

const width = 960;
const height = 500;
const margin = {
  top: 20,
  right: 30,
  bottom: 80,
  left: 100,
};
const xAxisOffset = 60;
const yAxisOffset = 50;

const yExtent = [-5, 5]

const tickOffset = 16;

const App = () => {
  const data = useData();

  if (!data) {
    return <pre>Loading....</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.right - margin.left;

  const xValue = (d: any): Date => new Date(d.x);
  const xAxisLabel = 'Time';

  const yValue = (d: any) => d.y;
  const yAxisLabel = 'Happiness';

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(yExtent)
    .range([innerHeight, 0])
    .nice();

  const xAxisTickFormat = timeFormat('%Y');

  const sheet = document.styleSheets[0];
  const styleRules = [];
  for (let i = 0; i < sheet.cssRules.length; i++)
    styleRules.push(sheet.cssRules.item(i).cssText);
  const styleText = styleRules.join(' ');

  return (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <style type="text/css">
        {styleText}
      </style>
      <g
        transform={`translate(${margin.left},${margin.top})`}
      >
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={tickOffset}
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffset={tickOffset}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          circleRadius={16}
        />
      </g>
    </svg>
  );
};

const download = () => {
  const data = (new XMLSerializer()).serializeToString(document.querySelector('svg'));
  const svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});

  const url = URL.createObjectURL(svg);

  const img = new Image();
  img.addEventListener('load', () => {  
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, width, height);

    URL.revokeObjectURL(url);

    const a = document.createElement('a');
    a.download = "life-graph.png";
    document.body.appendChild(a);
    a.href =  canvas.toDataURL();;
    a.click();
    a.remove();
  });
  img.src = url;
};

const Download = () => 
  <div style={{ textAlign: "center" }}>
    <button onClick={download}>Download</button>
  </div>;

const rootElement = document.getElementById('root');
ReactDOM.render(
  <App />, 
  rootElement
);

ReactDOM.render(
  <Download />,
  document.body.appendChild(document.createElement('div'))
);