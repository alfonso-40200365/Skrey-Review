import React, { useEffect, useState } from "react"
import WidgetBox from "./WidgetBox";

interface TrustBoxProps {
  width: string;
  height: string;
  className?: string;
  data_star?: string;
}

export default function RenderTrustPilot(props: TrustBoxProps) {
  return (
    <div className={`${props.className ?? ""}`}>
      {(
        <WidgetBox
          height={props.height}
          width={props.width}
          data_star={props.data_star ?? undefined}
        />
      )}
    </div>
  );
}