import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

const Calender = () => {
  useEffect(() => {
    const initializeCal = async () => {
      try {
        const cal = await getCalApi();

        // Check if cal.ns is available before accessing it
        if (cal.ns) {
          cal.ns["45-min-haircut"]("ui", {
            styles: { branding: { brandColor: "#323232" } },
            hideEventTypeDetails: false,
            layout: "month_view",
          });
        } else {
          console.error("cal.ns is undefined");
        }
      } catch (error) {
        console.error("Error initializing Cal API:", error);
      }
    };

    initializeCal();
  }, []);

  return (
    <Cal
      namespace="45-min-haircut"
      calLink="morvaridbeauty/45-min-haircut"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
};

export default Calender;
