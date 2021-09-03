(function (React, ReactDOM, d3) {
    'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var React__namespace = /*#__PURE__*/_interopNamespace(React);
    var ReactDOM__namespace = /*#__PURE__*/_interopNamespace(ReactDOM);

    var useData = function () {
        var _a = React.useState(null), data = _a[0], setData = _a[1];
        React.useEffect(function () {
            d3.json('./data/life.json').then(function (d) { return setData(d); });
        }, []);
        return data;
    };

    var AxisBottom = function (_a) {
        var xScale = _a.xScale, innerHeight = _a.innerHeight, tickFormat = _a.tickFormat, _b = _a.tickOffset, tickOffset = _b === void 0 ? 3 : _b;
        return xScale.ticks().map(function (tickValue) { return (React__namespace.createElement("g", { className: "tick", key: tickValue, transform: "translate(" + xScale(tickValue) + ",0)" },
            React__namespace.createElement("text", { style: { textAnchor: 'middle' }, dy: ".71em", y: innerHeight + tickOffset }, tickFormat(tickValue)))); });
    };

    var AxisLeft = function (_a) {
        var yScale = _a.yScale, innerWidth = _a.innerWidth, _b = _a.tickOffset, tickOffset = _b === void 0 ? 3 : _b;
        return yScale.ticks().map(function (tickValue) { return (React__namespace.createElement("g", { className: "tick", transform: "translate(0," + yScale(tickValue) + ")" },
            React__namespace.createElement("line", { x2: innerWidth }),
            React__namespace.createElement("text", { key: tickValue, style: { textAnchor: 'end' }, x: -tickOffset, y: (tickValue), dy: ".32em" }, tickValue))); });
    };

    var handleMouseEnter = function (cls, x, y, text1, text2) {
        var g = d3.select("svg")
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
    var handleMouseLeave = function (cls) {
        return d3.select("." + cls).remove();
    };
    var Marks = function (_a) {
        var data = _a.data, xScale = _a.xScale, yScale = _a.yScale, xValue = _a.xValue, yValue = _a.yValue, circleRadius = _a.circleRadius;
        return (React__namespace.createElement("g", { className: "marks" },
            React__namespace.createElement("path", { d: d3.line()
                    .x(function (d) { return xScale(xValue(d)); })
                    .y(function (d) { return yScale(yValue(d)); })
                    .curve(d3.curveLinear)(data) }),
            data.map(function (d) { return (React__namespace.createElement("a", { href: d.link },
                React__namespace.createElement("circle", { cx: xScale(xValue(d)), cy: yScale(yValue(d)), r: circleRadius, onMouseOver: function () { return handleMouseEnter("t-" + d.x, xScale(xValue(d)) + 100, yScale(yValue(d)) + 60, d.x, d.text); }, onMouseOut: function () { return handleMouseLeave("t-" + d.x); } }))); })));
    };

    var width = 960;
    var height = 500;
    var margin = {
        top: 20,
        right: 30,
        bottom: 80,
        left: 100
    };
    var xAxisOffset = 60;
    var yAxisOffset = 50;
    var yExtent = [-5, 5];
    var tickOffset = 16;
    var App = function () {
        var data = useData();
        if (!data) {
            return React__namespace.createElement("pre", null, "Loading....");
        }
        var innerHeight = height - margin.top - margin.bottom;
        var innerWidth = width - margin.right - margin.left;
        var xValue = function (d) { return new Date(d.x); };
        var xAxisLabel = 'Time';
        var yValue = function (d) { return d.y; };
        var yAxisLabel = 'Happiness';
        var xScale = d3.scaleTime()
            .domain(d3.extent(data, xValue))
            .range([0, innerWidth])
            .nice();
        var yScale = d3.scaleLinear()
            .domain(yExtent)
            .range([innerHeight, 0])
            .nice();
        var xAxisTickFormat = d3.timeFormat('%Y');
        var sheet = document.styleSheets[0];
        var styleRules = [];
        for (var i = 0; i < sheet.cssRules.length; i++)
            styleRules.push(sheet.cssRules.item(i).cssText);
        var styleText = styleRules.join(' ');
        return (React__namespace.createElement("svg", { width: width, height: height, xmlns: "http://www.w3.org/2000/svg" },
            React__namespace.createElement("style", { type: "text/css" }, styleText),
            React__namespace.createElement("g", { transform: "translate(" + margin.left + "," + margin.top + ")" },
                React__namespace.createElement(AxisBottom, { xScale: xScale, innerHeight: innerHeight, tickFormat: xAxisTickFormat, tickOffset: tickOffset }),
                React__namespace.createElement("text", { className: "axis-label", x: innerWidth / 2, y: innerHeight + xAxisOffset, textAnchor: "middle" }, xAxisLabel),
                React__namespace.createElement(AxisLeft, { yScale: yScale, innerWidth: innerWidth, tickOffset: tickOffset }),
                React__namespace.createElement("text", { className: "axis-label", textAnchor: "middle", transform: "translate(" + -yAxisOffset + "," + innerHeight / 2 + ") rotate(-90)" }, yAxisLabel),
                React__namespace.createElement(Marks, { data: data, xScale: xScale, yScale: yScale, xValue: xValue, yValue: yValue, circleRadius: 16 }))));
    };
    var download = function () {
        var data = (new XMLSerializer()).serializeToString(document.querySelector('svg'));
        var svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
        var url = URL.createObjectURL(svg);
        var img = new Image();
        img.addEventListener('load', function () {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(url);
            var a = document.createElement('a');
            a.download = "life-graph.png";
            document.body.appendChild(a);
            a.href = canvas.toDataURL();
            a.click();
            a.remove();
        });
        img.src = url;
    };
    var Download = function () {
        return React__namespace.createElement("div", { style: { textAlign: "center" } },
            React__namespace.createElement("button", { onClick: download }, "Download"));
    };
    var rootElement = document.getElementById('root');
    ReactDOM__namespace.render(React__namespace.createElement(App, null), rootElement);
    ReactDOM__namespace.render(React__namespace.createElement(Download, null), document.body.appendChild(document.createElement('div')));

}(React, ReactDOM, d3));
