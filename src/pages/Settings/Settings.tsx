import React from "react";

import { PropsFromRedux } from "./connector";

type Props = PropsFromRedux;

const Settings: React.FC<Props> = (props: Props) => {
  return (
    <>
      <>Name: [{props.username}]</>
    </>
  );
};

export default Settings;
