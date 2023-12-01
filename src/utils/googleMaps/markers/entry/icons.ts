import entryMarker from "../../../../assets/images/entryMarker.svg";

export const getIcon = (): google.maps.Icon => ({
  url: entryMarker,
  scaledSize: new google.maps.Size(28, 30),
});
