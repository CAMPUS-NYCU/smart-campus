import React from "react";
import creatingFlagMarker from "../../../assets/images/creatingFlagMarker.svg";

const CreatingFlag: React.FC = () => {
  return (
    <img
      src={creatingFlagMarker}
      alt="creating flag marker"
      className="mt-[calc(25vh-29px)] ml-[calc(50vw-9px)]"
    />
  );
};

export default CreatingFlag;
