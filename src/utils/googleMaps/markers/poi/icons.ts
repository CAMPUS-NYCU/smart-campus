import poiMarkerAccessibleParking from "../../../../assets/images/poiMarkerAccessibleParking.svg";
import poiMakrerAccessibleParkingHighlighted from "../../../../assets/images/poiMarkerAccessibleParkingHighlighted.svg";
import poiMarkerATM from "../../../../assets/images/poiMarkerATM.svg";
import poiMarkerATMHighlighted from "../../../../assets/images/poiMarkerATMHighlighted.svg";
import poiMarkerBarStool from "../../../../assets/images/poiMarkerBarStool.svg";
import poiMarkerBarStoolHighlighted from "../../../../assets/images/poiMarkerBarStoolHighlighted.svg";
import poiMarkerBasketball from "../../../../assets/images/poiMarkerBasketball.svg";
import poiMarkerBasketballHighlighted from "../../../../assets/images/poiMarkerBasketballHighlighted.svg";
import poiMarkerBikeParking from "../../../../assets/images/poiMarkerBikeParking.svg";
import poiMarkerBikeParkingHighlighted from "../../../../assets/images/poiMarkerBikeParkingHighlighted.svg";
import poiMarkerComputer from "../../../../assets/images/poiMarkerComputer.svg";
import poiMarkerComputerHighlighted from "../../../../assets/images/poiMarkerComputerHighlighted.svg";
import poiMarkerDrinkingFountain from "../../../../assets/images/poiMarkerDrinkingFountain.svg";
import poiMarkerDrinkingFountainHighlighted from "../../../../assets/images/poiMarkerDrinkingFountainHighlighted.svg";
import poiMarkerFacultyParking from "../../../../assets/images/poiMarkerFacultyParking.svg";
import poiMarkerFacultyParkingHighlighted from "../../../../assets/images/poiMarkerFacultyParkingHighlighted.svg";
import poiMarkerInfoDesk from "../../../../assets/images/poiMarkerInfoDesk.svg";
import poiMarkerInfoDeskHighlighted from "../../../../assets/images/poiMarkerInfoDeskHighlighted.svg";
import poiMarkerLocker from "../../../../assets/images/poiMarkerLocker.svg";
import poiMarkerLockerHighlighted from "../../../../assets/images/poiMarkerLockerHighlighted.svg";
import poiMarkerPrinter from "../../../../assets/images/poiMarkerPrinter.svg";
import poiMarkerPrinterHighlighted from "../../../../assets/images/poiMarkerPrinterHighlighted.svg";
import poiMarkerSofa from "../../../../assets/images/poiMarkerSofa.svg";
import poiMarkerSofaHighlighted from "../../../../assets/images/poiMarkerSofaHighlighted.svg";
import poiMarkerTennis from "../../../../assets/images/poiMarkerTennis.svg";
import poiMarkerTennisHighlighted from "../../../../assets/images/poiMarkerTennisHighlighted.svg";
import poiMarkerTreadmill from "../../../../assets/images/poiMarkerTreadmill.svg";
import poiMarkerTreadmillHighlighted from "../../../../assets/images/poiMarkerTreadmillHighlighted.svg";
import poiMarkerUsualParking from "../../../../assets/images/poiMarkerUsualParking.svg";
import poiMarkerUsualParkingHighlighted from "../../../../assets/images/poiMarkerUsualParkingHighlighted.svg";
import poiMarkerUsualSeat from "../../../../assets/images/poiMarkerUsualSeat.svg";
import poiMarkerUsualSeatHighlighted from "../../../../assets/images/poiMarkerUsualSeatHighlighted.svg";
import poiMarkerVendingMachine from "../../../../assets/images/poiMarkerVendingMachine.svg";
import poiMarkerVendingMachineHighlighted from "../../../../assets/images/poiMarkerVendingMachineHighlighted.svg";
import poiMarkerVolleyball from "../../../../assets/images/poiMarkerVolleyball.svg";
import poiMarkerVolleyballHighlighted from "../../../../assets/images/poiMarkerVolleyballHighlighted.svg";

export const getIcon = (targetName: string | ""): google.maps.Icon => {
  let thisUrl: string;
  switch (targetName) {
    case "路邊無障礙停車位":
      thisUrl = poiMarkerAccessibleParking;
      break;
    case "ATM":
      thisUrl = poiMarkerATM;
      break;
    case "高腳椅區":
      thisUrl = poiMarkerBarStool;
      break;
    case "室外籃球場":
      thisUrl = poiMarkerBasketball;
      break;
    case "腳踏車停車區":
      thisUrl = poiMarkerBikeParking;
      break;
    case "公用電腦":
      thisUrl = poiMarkerComputer;
      break;
    case "飲水機":
      thisUrl = poiMarkerDrinkingFountain;
      break;
    case "教職員停車區":
      thisUrl = poiMarkerFacultyParking;
      break;
    case "服務台":
      thisUrl = poiMarkerInfoDesk;
      break;
    case "置物櫃":
      thisUrl = poiMarkerLocker;
      break;
    case "公用印表機":
      thisUrl = poiMarkerPrinter;
      break;
    case "沙發區":
      thisUrl = poiMarkerSofa;
      break;
    case "室外網球場":
      thisUrl = poiMarkerTennis;
      break;
    case "跑步機":
      thisUrl = poiMarkerTreadmill;
      break;
    case "路邊一般停車位":
      thisUrl = poiMarkerUsualParking;
      break;
    case "一般座位區":
      thisUrl = poiMarkerUsualSeat;
      break;
    case "販賣機":
      thisUrl = poiMarkerVendingMachine;
      break;
    case "室外排球場":
      thisUrl = poiMarkerVolleyball;
      break;
    default:
      console.log(`No icon for ${targetName}`);
      thisUrl = "";
      break;
  }

  return {
    url: thisUrl,
    scaledSize: new google.maps.Size(28, 30),
  };
};

export const getHighlightedIcon = (
  targetName: string | "",
): google.maps.Icon => {
  let thisUrl: string;

  switch (targetName) {
    case "路邊無障礙停車位":
      thisUrl = poiMakrerAccessibleParkingHighlighted;
      break;
    case "ATM":
      thisUrl = poiMarkerATMHighlighted;
      break;
    case "高腳椅區":
      thisUrl = poiMarkerBarStoolHighlighted;
      break;
    case "室外籃球場":
      thisUrl = poiMarkerBasketballHighlighted;
      break;
    case "腳踏車停車區":
      thisUrl = poiMarkerBikeParkingHighlighted;
      break;
    case "公用電腦":
      thisUrl = poiMarkerComputerHighlighted;
      break;
    case "飲水機":
      thisUrl = poiMarkerDrinkingFountainHighlighted;
      break;
    case "教職員停車區":
      thisUrl = poiMarkerFacultyParkingHighlighted;
      break;
    case "服務台":
      thisUrl = poiMarkerInfoDeskHighlighted;
      break;
    case "置物櫃":
      thisUrl = poiMarkerLockerHighlighted;
      break;
    case "公用印表機":
      thisUrl = poiMarkerPrinterHighlighted;
      break;
    case "沙發區":
      thisUrl = poiMarkerSofaHighlighted;
      break;
    case "室外網球場":
      thisUrl = poiMarkerTennisHighlighted;
      break;
    case "跑步機":
      thisUrl = poiMarkerTreadmillHighlighted;
      break;
    case "路邊一般停車位":
      thisUrl = poiMarkerUsualParkingHighlighted;
      break;
    case "一般座位區":
      thisUrl = poiMarkerUsualSeatHighlighted;
      break;
    case "販賣機":
      thisUrl = poiMarkerVendingMachineHighlighted;
      break;
    case "室外排球場":
      thisUrl = poiMarkerVolleyballHighlighted;
      break;
    default:
      console.log(`No highlighted icon for ${targetName}`);
      thisUrl = "";
      break;
  }

  return {
    url: thisUrl,
    scaledSize: new google.maps.Size(28, 30),
  };
};
