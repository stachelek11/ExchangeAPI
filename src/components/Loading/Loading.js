import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Loading.scss";

const Loading = () => (
  <div className="loading">
    <CircularProgress color="inherit" />
  </div>
);

export default Loading;
