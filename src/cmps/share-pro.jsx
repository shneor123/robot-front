import React, { useState } from "react";
import { RWebShare } from "react-web-share";

export const ShareProj = () => {
  return (  
      <div className="share">
        <RWebShare
          data={{
            text: "Like humans, flamingos make friends for life",
            url: "https://on.natgeo.com/2zHaNup",
            title: "Flamingos",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <button>Share 🔗</button>
        </RWebShare>
    </div>
  );
};