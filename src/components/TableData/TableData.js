import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./TableData.scss";

const TableData = () => {
  const [loading, setLoading] = useState(true);
  const [rows] = useState([]);

  const array = ["IBM", "AAA", "TSLA"];

  function createData(Data) {
    const symbol = Data["Meta Data"]["2. Symbol"];
    const open = Object.values(Data["Time Series (Daily)"])[0]["1. open"];
    const high = Object.values(Data["Time Series (Daily)"])[0]["2. high"];
    const low = Object.values(Data["Time Series (Daily)"])[0]["3. low"];
    const close = Object.values(Data["Time Series (Daily)"])[0]["4. close"];
    return { symbol, open, high, low, close };
  }

  useEffect(() => {
    Promise.all([
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${array[0]}&apikey=${process.env.REACT_APP_API_KEY}`
      ).then((resp1) => resp1.json()),
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${array[1]}&apikey=${process.env.REACT_APP_API_KEY}`
      ).then((resp2) => resp2.json()),
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${array[2]}&apikey=${process.env.REACT_APP_API_KEY}`
      ).then((resp3) => resp3.json()),
    ])
      .then(([resp1, resp2, resp3]) => {
        rows.push(createData(resp1), createData(resp2), createData(resp3));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    //eslint-disable-next-line
  }, []);

  console.log(rows);

  return (
    <div className="info">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="right">Open</TableCell>
                  <TableCell align="right">High</TableCell>
                  <TableCell align="right">Low</TableCell>
                  <TableCell align="right">Close</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.symbol}>
                    <TableCell component="th" scope="row">
                      {row.symbol}
                    </TableCell>
                    <TableCell align="right">{row.open}</TableCell>
                    <TableCell align="right">{row.high}</TableCell>
                    <TableCell align="right">{row.low}</TableCell>
                    <TableCell align="right">{row.close}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default TableData;
