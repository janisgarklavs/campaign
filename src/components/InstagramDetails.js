import React from "react";
import AgeRange from "./AgeRange";

const InstagramDetails = ({ platform }) => (
  <div className=" ">
    <div>Platform</div>
    <AgeRange range={platform.target_audience.age_range} />
  </div>
);

export default InstagramDetails;
