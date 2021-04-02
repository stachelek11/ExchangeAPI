import React from "react";
import Info from "../../components/Info/Info";
import "./Details.scss";

const Details = (props) => {
  return (
    <div className="details">
      <Info symbol={props.match.params.symbol} />
    </div>
  );
};

export default Details;
