import clusterMarker from "../../../../assets/images/clusterMarker.svg";

export const getIcon = (): google.maps.Icon => ({
  url: clusterMarker,
  scaledSize: new google.maps.Size(28, 30),
  labelOrigin: new google.maps.Point(15, 34),
});
