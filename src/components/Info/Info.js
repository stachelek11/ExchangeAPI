import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import "./Info.scss";
import Chart from "../Chart/Chart";

const Info = ({ symbol }) => {
  const [loading, setLoading] = useState(true);
  const [dataInfo, setDataInfo] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => response.json())
      .then((Data) => {
        setDataInfo(Data);
        setLoading(false);
      })
      .catch(() => {
        console.log("Error fetch details info...");
        setLoading(false);
      });
  }, [symbol]);

  return (
    <div className="info">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="info__main">
            <Chart symbol={symbol} />
            <div style={{ padding: "20px" }}>
              <div className="info__paragraph">
                <p className="info__paragraph--name">Name:</p>
                <p className="info__paragraph--value">{dataInfo.Name}</p>
              </div>
              <div className="info__paragraph">
                <p className="info__paragraph--name">Exchange:</p>
                <p className="info__paragraph--value">{dataInfo.Exchange}</p>
              </div>
              <div className="info__paragraph">
                <p className="info__paragraph--name">Sector:</p>
                <p className="info__paragraph--value">{dataInfo.Sector}</p>
              </div>
              <div className="info__paragraph">
                <p className="info__paragraph--name">Country:</p>
                <p className="info__paragraph--value">{dataInfo.Country}</p>
              </div>
              <div className="info__paragraph">
                <p className="info__paragraph--name">Industry:</p>
                <p className="info__paragraph--value">{dataInfo.Industry}</p>
              </div>
            </div>
          </div>
          <div className="info__paragraph info__paragraph--description">
            <p className="info__paragraph--name">Description:</p>
            <p className="info__paragraph--value">{dataInfo.Description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
