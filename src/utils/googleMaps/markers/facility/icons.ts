import facilityMarkerAccessibleParking from "../../../../assets/images/facilityMarkerAccessibleParking.svg";
import facilityMarkerATM from "../../../../assets/images/facilityMarkerATM.svg";
import facilityMarkerBarStool from "../../../../assets/images/facilityMarkerBarStool.svg";
import facilityMarkerBasketball from "../../../../assets/images/facilityMarkerBasketball.svg";
import facilityMarkerBikeParking from "../../../../assets/images/facilityMarkerBikeParking.svg";
import facilityMarkerComputer from "../../../../assets/images/facilityMarkerComputer.svg";
import facilityMarkerDrinkingFountain from "../../../../assets/images/facilityMarkerDrinkingFountain.svg";
import facilityMarkerFacultyParking from "../../../../assets/images/facilityMarkerFacultyParking.svg";
import facilityMarkerInfoDesk from "../../../../assets/images/facilityMarkerInfoDesk.svg";
import facilityMarkerLocker from "../../../../assets/images/facilityMarkerLocker.svg";
import facilityMarkerPrinter from "../../../../assets/images/facilityMarkerPrinter.svg";
import facilityMarkerSofa from "../../../../assets/images/facilityMarkerSofa.svg";
import facilityMarkerTennis from "../../../../assets/images/facilityMarkerTennis.svg";
import facilityMarkerTreadmill from "../../../../assets/images/facilityMarkerTreadmill.svg";
import facilityMarkerUsualParking from "../../../../assets/images/facilityMarkerUsualParking.svg";
import facilityMarkerUsualSeat from "../../../../assets/images/facilityMarkerUsualSeat.svg";
import facilityMarkerVendingMachine from "../../../../assets/images/facilityMarkerVendingMachine.svg";
import facilityMarkerVolleyball from "../../../../assets/images/facilityMarkerVolleyball.svg";

export const getIcon = (targetName: string | ""): google.maps.Icon => {
  let thisUrl: string;
  switch (targetName) {
    case "路邊無障礙停車位":
      thisUrl = facilityMarkerAccessibleParking;
      break;
    case "ATM":
      thisUrl = facilityMarkerATM;
      break;
    case "高腳椅區":
      thisUrl = facilityMarkerBarStool;
      break;
    case "室外籃球場":
      thisUrl = facilityMarkerBasketball;
      break;
    case "腳踏車停車區":
      thisUrl = facilityMarkerBikeParking;
      break;
    case "公用電腦":
      thisUrl = facilityMarkerComputer;
      break;
    case "飲水機":
      thisUrl = facilityMarkerDrinkingFountain;
      break;
    case "教職員停車區":
      thisUrl = facilityMarkerFacultyParking;
      break;
    case "服務台":
      thisUrl = facilityMarkerInfoDesk;
      break;
    case "置物櫃":
      thisUrl = facilityMarkerLocker;
      break;
    case "公用印表機":
      thisUrl = facilityMarkerPrinter;
      break;
    case "沙發區":
      thisUrl = facilityMarkerSofa;
      break;
    case "室外網球場":
      thisUrl = facilityMarkerTennis;
      break;
    case "跑步機":
      thisUrl = facilityMarkerTreadmill;
      break;
    case "路邊一般停車位":
      thisUrl = facilityMarkerUsualParking;
      break;
    case "一般座位區":
      thisUrl = facilityMarkerUsualSeat;
      break;
    case "販賣機":
      thisUrl = facilityMarkerVendingMachine;
      break;
    case "室外排球場":
      thisUrl = facilityMarkerVolleyball;
      break;
    default:
      console.error(`No icon for ${targetName}`);
      thisUrl = "";
      break;
  }

  return {
    url: thisUrl,
    scaledSize: new google.maps.Size(28, 30),
    labelOrigin: new google.maps.Point(15, 34),
  };
};
