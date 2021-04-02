import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryZoomContainer, VictoryLine } from "victory";
import Loading from "../Loading/Loading";
import "./Chart.scss";

const Chart = ({ symbol }) => {
  const [loading, setLoading] = useState(true);
  const [arrayData, setArrayData] = useState([]);
  const [zoom, setZoom] = useState({
    zoomDomain: {
      x: [new Date(1900, 1, 1), new Date(2021, 1, 1)],
    },
  });

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=EMA&symbol=${symbol}&interval=weekly&time_period=10&series_type=open&apikey=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((Data) => {
        for (const [key, value] of Object.entries(
          Data["Technical Analysis: EMA"]
        )) {
          arrayData.push({ a: new Date(key), b: parseFloat(value.EMA) });
        }
        return arrayData;
      })
      .then((array) => {
        setZoom({
          zoomDomain: {
            x: [new Date(array[array.length - 1].a), new Date(array[0].a)],
          },
        });
        setTimeout(() => setLoading(false), 100);
      })
      .catch(() => {
        console.log("Error fetch chart data...");
        setArrayData([]);
        setLoading(false);
      });
    //eslint-disable-next-line
  }, [symbol]);
  const handleZoom = (domain) => {
    setZoom({ zoomDomain: domain });
  };

  return (
    <div className="chart">
      {loading ? (
        <Loading />
      ) : arrayData.length === 0 ? (
        <div>No data</div>
      ) : (
        <VictoryChart
          width={900}
          height={300}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={zoom.zoomDomain}
              onZoomDomainChange={handleZoom.bind()}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "gold" },
            }}
            data={arrayData}
            x="a"
            y="b"
          />
        </VictoryChart>
      )}
    </div>
  );
};

export default Chart;
