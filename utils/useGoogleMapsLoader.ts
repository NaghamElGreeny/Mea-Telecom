import { useJsApiLoader } from "@react-google-maps/api";

export const useGoogleMapsLoader = () => {
  return useJsApiLoader({
    id: "google-map-script", 
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
    language: "en",
    region: "US",
  });
};