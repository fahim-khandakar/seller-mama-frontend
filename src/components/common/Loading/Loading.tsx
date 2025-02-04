import React from "react";
import "./loading.css";
const Loading = ({ fullPage }: { fullPage?: boolean }) => {
  return (
    <div
      className={`${
        fullPage ? "min-h-screen" : "py-5"
      } flex justify-center items-center  `}
    >
      <div className="space-y-2">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
