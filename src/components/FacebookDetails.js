import React, { Component } from "react";
import CampaignStatus from "./CampaignStatus";

class FacebookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsVisible: false,
      platform: props.platform
    };
  }
  render() {
    const { platform } = this.state;
    let detailsStyle = {
      display: "none"
    };
    return (
      <div className=" ">
        <div>{platform.type}</div>
        <div>
          <CampaignStatus status={platform.status} small />
        </div>
        <div>
          Budget: ${platform.total_budget} ($
          {platform.remaining_budget} left)
        </div>
        <div>Start :{platform.start_date}</div>
        <div>End :{platform.end_date}</div>
        <div style={detailsStyle}>
          <div>Target Audience</div>
          <div>Languages: {platform.target_audience.languages.toString()}</div>
        </div>
      </div>
    );
  }
}

export default FacebookDetails;
