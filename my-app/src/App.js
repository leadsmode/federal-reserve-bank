import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import Accordion from "react-bootstrap/Accordion";
import "./App.css";
//import { getFrbData } from "./Api/frb-data.js";

function App() {
  /*let data = () => getFrbData(); */
  const data = {
    description: {
      title: "Global Land and Ocean Temperature Anomalies, October",
      units: "Degrees Celsius",
      base_period: "1901-2000",
      missing: -999,
    },
    data: {
      1880: "-0.22",
      1881: "-0.29",
      1882: "-0.21",
      1883: "-0.21",
      1884: "-0.25",
      1885: "-0.19",
      1886: "-0.31",
      1887: "-0.32",
      1888: "0.04",
      1889: "-0.24",
      1890: "-0.34",
      1891: "-0.28",
      1892: "-0.27",
      1893: "-0.24",
      1894: "-0.29",
      1895: "-0.11",
      1896: "0.02",
      1897: "-0.17",
      1898: "-0.38",
      1899: "-0.09",
      1900: "0.08",
      1901: "-0.32",
      1902: "-0.31",
      1903: "-0.51",
      1904: "-0.42",
      1905: "-0.25",
      1906: "-0.28",
      1907: "-0.30",
      1908: "-0.50",
      1909: "-0.36",
      1910: "-0.43",
      1911: "-0.32",
      1912: "-0.54",
      1913: "-0.31",
      1914: "-0.10",
      1915: "-0.23",
      1916: "-0.28",
      1917: "-0.33",
      1918: "-0.11",
      1919: "-0.24",
      1920: "-0.23",
      1921: "-0.06",
      1922: "-0.28",
      1923: "-0.19",
      1924: "-0.31",
      1925: "-0.16",
      1926: "-0.08",
      1927: "0.01",
      1928: "-0.16",
      1929: "-0.14",
      1930: "-0.02",
      1931: "0.04",
      1932: "-0.09",
      1933: "-0.20",
      1934: "-0.03",
      1935: "-0.03",
      1936: "-0.01",
      1937: "0.10",
      1938: "0.08",
      1939: "0.00",
      1940: "0.16",
      1941: "0.43",
      1942: "0.07",
      1943: "0.26",
      1944: "0.32",
      1945: "0.28",
      1946: "0.00",
      1947: "0.06",
      1948: "-0.06",
      1949: "-0.06",
      1950: "-0.16",
      1951: "0.13",
      1952: "0.01",
      1953: "0.12",
      1954: "-0.05",
      1955: "-0.12",
      1956: "-0.19",
      1957: "0.03",
      1958: "0.07",
      1959: "0.00",
      1960: "0.06",
      1961: "-0.02",
      1962: "0.12",
      1963: "0.22",
      1964: "-0.25",
      1965: "0.02",
      1966: "-0.07",
      1967: "0.15",
      1968: "0.05",
      1969: "0.09",
      1970: "-0.02",
      1971: "-0.08",
      1972: "0.10",
      1973: "0.07",
      1974: "-0.07",
      1975: "-0.12",
      1976: "-0.19",
      1977: "0.12",
      1978: "0.07",
      1979: "0.29",
      1980: "0.18",
      1981: "0.18",
      1982: "0.18",
      1983: "0.24",
      1984: "0.14",
      1985: "0.14",
      1986: "0.22",
      1987: "0.35",
      1988: "0.31",
      1989: "0.29",
      1990: "0.43",
      1991: "0.29",
      1992: "0.05",
      1993: "0.22",
      1994: "0.42",
      1995: "0.44",
      1996: "0.21",
      1997: "0.64",
      1998: "0.48",
      1999: "0.35",
      2000: "0.32",
      2001: "0.52",
      2002: "0.49",
      2003: "0.74",
      2004: "0.60",
      2005: "0.68",
      2006: "0.68",
      2007: "0.56",
      2008: "0.67",
      2009: "0.64",
      2010: "0.63",
      2011: "0.61",
      2012: "0.70",
      2013: "0.66",
      2014: "0.76",
      2015: "1.03",
      2016: "0.79",
      2017: "0.81",
      2018: "0.92",
      2019: "0.94",
      2020: "0.82",
    },
  };
  const [frb_data, setfrbData] = useState(data);
  const frbChart = useRef();
  const [newTemp, setnewTemp] = useState("");
  const [lastTemp, setlastTemp] = useState("");

  let months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  let fetch_years = Object.entries(frb_data["data"]);

  let years = [];
  var i = 0;
  for (i = 0; i < fetch_years.length; i++) {
    years.push(fetch_years[i][0]);
  }

  const handleInputChange = (event) => {
    setnewTemp(event.target.value);
  };

  function alterTemperature(action) {
    let checkData = Object.entries(frb_data["data"]);
    let yearArray = [];
    let tempArray = [];

    var i = 0;
    for (i = 0; i < checkData.length; i++) {
      if (action == "remove") {
        if (i == checkData.length - 1) {
        } else {
          yearArray.push(parseInt(checkData[i][0]));
          tempArray.push(checkData[i][1]);
          setlastTemp(checkData[i][1]);
        }
      } else {
        yearArray.push(parseInt(checkData[i][0]));
        tempArray.push(checkData[i][1]);
        if (i == checkData.length - 1) {
          yearArray.push(parseInt(checkData[i][0]) + 1);
          tempArray.push(newTemp);
          setlastTemp(newTemp);
          break;
        }
      }
    }

    var frbNewData = {};
    var j = 0;
    for (j = 0; j < tempArray.length; j++) {
      if (tempArray[j] !== undefined) {
        frbNewData[yearArray[j]] = tempArray[j];
      }

      if (j == tempArray.length - 1) {
        frb_data["data"] = frbNewData;
        drawChart(frb_data);
      }
    }
  }

  function drawChart(frb_data) {
    d3.selectAll("svg > *").remove();

    const data = Object.entries(frb_data["data"]);
    const description = Object.entries(frb_data["description"]);
    const year = [];
    const temp = [];
    const title = description[0][1];
    const units = description[1][1];
    const base_period = description[2][1];
    const missing = description[3][1];
    const y_label = "Year";

    var i = 0;

    for (i = 0; i < data.length; i++) {
      year.push(data[i][0]);
      temp.push(data[i][1]);
      if (i == data.length - 1) {
        setlastTemp(data[i][1]);
      }
    }

    //Let's build the Chart

    const width = parseInt(d3.select("#chartContainer").style("width"));
    const height = parseInt(d3.select("#chartContainer").style("height"));

    let dataTemp = fetch_years.map((data) => {
      return { x: data[0], y: data[1] };
    });

    var svg = d3
      .select(frbChart.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#eeeeee")
      .style("overflow", "visible");

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(
      d3.extent(dataTemp, (d) => {
        return d.x;
      })
    );

    y.domain([
      -0.6,
      d3.max(dataTemp, (d) => {
        return d.y;
      }),
    ]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
    svg.append("g").call(d3.axisLeft(y)).style("text-anchor", "end");

    var valueLine = d3
      .line()
      .x((d) => {
        return x(d.x);
      })
      .y((d) => {
        return y(d.y);
      })
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(dataTemp)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .attr("d", valueLine);

    svg
      .selectAll("myCircles")
      .data(dataTemp)
      .enter()
      .append("circle")
      .attr("fill", "steelblue")
      .attr("stroke", "none")
      .attr("cx", function (d) {
        return x(d.x);
      })
      .attr("cy", function (d) {
        return y(d.y);
      })
      .attr("r", 3.5);

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height - height * -0.2)
      .text(y_label);

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("y", -60)
      .attr("x", -height / 2)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text(units);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("y", -18)
      .text(title);
  }

  useEffect(() => {
    //Let's extract & define FRB data variables :)
    drawChart(frb_data);
  }, frb_data);

  let [month, setMonth] = useState("month");
  let populateMonth = (e) => {
    setMonth(e.target.value);
  };

  let [year, setYear] = useState("year");
  let populateYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <h6>
          Here's how <strong>Anthony Nwokoagbara</strong> landed a job with the
          <strong> Federal Reserve Bank</strong>
        </h6>
        <form>
          <fieldset>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-lg-2 col-md-2 col-sm-12 p-1 text-left">
                    <label class="form-label" for="yearFrom">
                      From:
                    </label>
                    <select
                      className="form-control form-control-sm"
                      name="yearFrom"
                      onChange={populateYear}
                    >
                      <option value="year">-- year --</option>
                      {years.map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12 p-1 text-left">
                    <label class="form-label" for="monthFrom"></label>
                    <select
                      className="form-control form-control-sm"
                      name="monthFrom"
                      onChange={populateMonth}
                    >
                      <option value="month">-- month --</option>
                      {months.map((month) => (
                        <option value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12 p-1 text-left">
                    <label class="form-label" for="yearTo">
                      To:
                    </label>
                    <select
                      className="form-control form-control-sm"
                      name="yearTo"
                      onChange={populateYear}
                    >
                      <option value="year">-- year --</option>
                      {years.map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12 p-1 text-left">
                    <label class="form-label" for="monthTo"></label>
                    <select
                      className="form-control form-control-sm"
                      name="monthTo"
                      onChange={populateMonth}
                    >
                      <option value="month">-- month --</option>
                      {months.map((month) => (
                        <option value={month}>{month}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-12 p-1">
                    <label class="form-label" for="resetDates"></label>
                    <button
                      className="form-control btn btn-sm btn-primary"
                      name="resetDates"
                      type="submit"
                    >
                      Reset Dates
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="chart-container" id="chartContainer">
        <svg className="frbChart" ref={frbChart}></svg>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Accordion defaultActiveKey="0" className="row">
              <Accordion.Item
                eventKey="0"
                className="col-lg-6 col-md-6 col-sm-12"
              >
                <Accordion.Header>Add Temperature Value</Accordion.Header>
                <Accordion.Body>
                  <label class="form-label">
                    <small>Temperature</small>
                  </label>
                  <input
                    className="form-control form-control-sm"
                    name="newTempValue"
                    type="number"
                    placeholder="enter new temperature"
                    onChange={handleInputChange}
                    value={newTemp}
                  ></input>
                  <button
                    className="btn btn-sm btn-primary mt-2"
                    onClick={() => alterTemperature("add")}
                  >
                    Add
                  </button>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="1"
                className="col-lg-6 col-md-6 col-sm-12"
              >
                <Accordion.Header>
                  Remove Last Temperature Value
                </Accordion.Header>
                <Accordion.Body>
                  <label class="form-label">
                    <small>Last Value</small>
                  </label>
                  <input
                    className="form-control form-control-sm"
                    name="lastTempValue"
                    placeholder=""
                    value={lastTemp}
                    disabled
                  ></input>
                  <button
                    className="btn btn-sm btn-secondary mt-2"
                    onClick={() => alterTemperature("remove")}
                  >
                    Remove
                  </button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
