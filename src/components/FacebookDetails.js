import React from "react";
import AgeRange from "./AgeRange";

const FacebookDetails = ({ platform }) => (
  <div className=" ">
    <div>Platform</div>
    <AgeRange range={platform.target_audience.age_range} />
  </div>
);

export default FacebookDetails;
