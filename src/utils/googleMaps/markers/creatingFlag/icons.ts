import CreatingFlagMarker from "../../../../assets/images/creatingFlagMarker.svg";

export const getIcon = (): google.maps.Icon => ({
  url: CreatingFlagMarker,
  scaledSize: new google.maps.Size(28, 30),
});
