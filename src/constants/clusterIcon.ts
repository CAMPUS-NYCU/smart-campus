import clusterTargetAccessibleParking from "../assets/images/clusterTargetAccessibleParking.svg";
import clusterTargetATM from "../assets/images/clusterTargetATM.svg";
import clusterTargetBarStool from "../assets/images/clusterTargetBarStool.svg";
import clusterTargetBasketball from "../assets/images/clusterTargetBasketball.svg";
import clusterTargetBikeParking from "../assets/images/clusterTargetBikeParking.svg";
import clusterTargetComputer from "../assets/images/clusterTargetComputer.svg";
import clusterTargetDrinkingFountain from "../assets/images/clusterTargetDrinkingFountain.svg";
import clusterTargetFacultyParking from "../assets/images/clusterTargetFacultyParking.svg";
import clusterTargetInfoDesk from "../assets/images/clusterTargetInfoDesk.svg";
import clusterTargetLocker from "../assets/images/clusterTargetLocker.svg";
import clusterTargetPrinter from "../assets/images/clusterTargetPrinter.svg";
import clusterTargetSofa from "../assets/images/clusterTargetSofa.svg";
import clusterTargetTennis from "../assets/images/clusterTargetTennis.svg";
import clusterTargetTreadmill from "../assets/images/clusterTargetTreadmill.svg";
import clusterTargetUsualParking from "../assets/images/clusterTargetUsualParking.svg";
import clusterTargetUsualSeat from "../assets/images/clusterTargetUsualSeat.svg";
import clusterTargetVendingMachine from "../assets/images/clusterTargetVendingMachine.svg";
import clusterTargetVolleyball from "../assets/images/clusterTargetVolleyball.svg";

export const getClusterIcon = (targetName: string | ""): string => {
  let thisUrl: string;
  switch (targetName) {
    case "路邊無障礙停車位":
      thisUrl = clusterTargetAccessibleParking;
      break;
    case "ATM":
      thisUrl = clusterTargetATM;
      break;
    case "高腳椅區":
      thisUrl = clusterTargetBarStool;
      break;
    case "室外籃球場":
      thisUrl = clusterTargetBasketball;
      break;
    case "腳踏車停車區":
      thisUrl = clusterTargetBikeParking;
      break;
    case "公用電腦":
      thisUrl = clusterTargetComputer;
      break;
    case "飲水機":
      thisUrl = clusterTargetDrinkingFountain;
      break;
    case "教職員停車區":
      thisUrl = clusterTargetFacultyParking;
      break;
    case "服務台":
      thisUrl = clusterTargetInfoDesk;
      break;
    case "置物櫃":
      thisUrl = clusterTargetLocker;
      break;
    case "公用印表機":
      thisUrl = clusterTargetPrinter;
      break;
    case "沙發區":
      thisUrl = clusterTargetSofa;
      break;
    case "室外網球場":
      thisUrl = clusterTargetTennis;
      break;
    case "跑步機":
      thisUrl = clusterTargetTreadmill;
      break;
    case "路邊一般停車位":
      thisUrl = clusterTargetUsualParking;
      break;
    case "一般座位區":
      thisUrl = clusterTargetUsualSeat;
      break;
    case "販賣機":
      thisUrl = clusterTargetVendingMachine;
      break;
    case "室外排球場":
      thisUrl = clusterTargetVolleyball;
      break;
    default:
      console.error(`No icon for ${targetName}`);
      thisUrl = "";
      break;
  }

  return thisUrl;
};
