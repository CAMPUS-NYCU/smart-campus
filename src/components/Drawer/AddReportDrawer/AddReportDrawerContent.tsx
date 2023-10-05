import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "@nextui-org/react";

import { IRootState } from "../../../store";
import { AddReportData, updateAddReportData } from "../../../store/report";
import { maps } from "../../../utils/googleMaps";

const AddReportDrawerContent: React.FC = () => {
  const dispatch = useDispatch();
  const reportData = useSelector((state: IRootState) => state.report.data);

  const handleUpdataData = (key: keyof AddReportData) => {
    const oldValue = reportData[key];
    return (value: typeof oldValue) => {
      dispatch(updateAddReportData({ [key]: value }));
    };
  };

  const handleSetLatLng = () => {
    const center = maps.getCenter();
    if (!center) {
      throw new Error("LatLng not found");
    }

    const updateLatLng = handleUpdataData("latlng");
    const newLagLng = { latitude: center.lat(), longitude: center.lng() };
    updateLatLng(newLagLng);
  };

  return (
    <div>
      <Input
        autoFocus
        label="Name"
        placeholder="Enter the name"
        autoComplete="text"
        value={reportData.name || ""}
        isInvalid={!reportData.name}
        onValueChange={handleUpdataData("name")}
        variant="bordered"
      />
      <Input
        label="Description"
        placeholder="Enter the description"
        autoComplete="text"
        value={reportData.description || ""}
        isInvalid={!reportData.description}
        onValueChange={handleUpdataData("description")}
        variant="bordered"
      />
      <div className="flex justify-between items-center">
        <h1>Location</h1>
        <Button onClick={handleSetLatLng}>Mark</Button>
      </div>
    </div>
  );
};

export default AddReportDrawerContent;
