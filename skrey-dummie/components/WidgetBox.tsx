import React, { useEffect, useRef, useState } from "react";

interface TrustBoxProps {
  width: string;
  height: string;
  className?: string;
  data_star?: string;
}

const WidgetBox = (props: TrustBoxProps) => {
  // Create a reference to the <div> element which will represent the TrustBox
  const ref = useRef<HTMLDivElement>(null);

  const cn = props.className ?? "";

  return (
    <div
      ref={ref} // We need a reference to this element to load the TrustBox in the effect.
      className={`trustpilot-widget ${cn}`} // Renamed this to className.
      data-style-height={props.height}
      data-style-width={props.width}
      data-font-family="Lato"
      data-stars={props.data_star ?? null}
    >
      <a href="https://www.trustpilot.com/review/example.com" target="_blank" rel="noopener">
        {" "}
        Trustpilot
      </a>
    </div>
  );
};
export default WidgetBox;
