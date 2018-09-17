import React from "react";

const Platforms = ({ platforms }) => (
  <>
    <span className="mr-2">
      <i
        className="fab fa-facebook-square"
        style={hasPlatform(platforms, "facebook")}
      />
    </span>
    <span className="mr-2">
      <i
        className="fab fa-instagram"
        style={hasPlatform(platforms, "instagram")}
      />
    </span>
    <span className="mr-2">
      <i className="fab fa-google" style={hasPlatform(platforms, "google")} />
    </span>
  </>
);

const hasPlatform = (platforms, platform) => {
  if (platforms.indexOf(platform) !== -1) {
    return {
      opacity: 1
    };
  }
  return { opacity: 0.1 };
};

export default Platforms;
