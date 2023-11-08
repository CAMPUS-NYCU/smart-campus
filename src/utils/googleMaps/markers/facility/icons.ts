import facilityMarker from "../../../../assets/images/facilityMarker.svg";

export const getIcon = (): google.maps.Icon => ({
  url: facilityMarker,
  scaledSize: new google.maps.Size(28, 30),
  labelOrigin: new google.maps.Point(15, 34),
});
