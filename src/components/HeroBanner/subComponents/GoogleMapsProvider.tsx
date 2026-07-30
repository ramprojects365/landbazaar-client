"use client";

import React from "react";
import { LoadScript, Libraries } from "@react-google-maps/api";

const libraries: Libraries = ["places"];

interface GoogleMapsProviderProps {
  children: React.ReactNode;
}

const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({
  children,
}) => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDQcayr9WhBIuzzIMaXURU7lG7GvExMQx4"
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
