import OpenAI from "openai";
import env from "../../constants/env";
import referenceData from "../../assets/data/gpt/reference.json";
import markersPosition from "../../assets/data/gpt/markers-position.json";
import multiFloorMarkersPosition from "../../assets/data/gpt/multi-floor-markers-position.json";
import { PoisForGpt } from "../../models/poi";
import { changeStatusToEnglish } from "../../constants/gpt";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const prompt_lite = `
      # 指定樓層
      如果用戶未指定樓層，則默認為「一樓」。樓層選項包括一樓至四樓。

      # 指定參照點
      包括管理二館、工程四館、工程五館、人社館系列（一至三館）、小木屋、LALA Kitchen、行政大樓、竹湖及科學一館。若用戶提及的參照點未列出，請選擇最接近的選項。

      # 物體狀態
      描述物體狀態時，使用以下標籤：
      - "保養"：物體正在維護
      - "功能"：物體的功能性
      - "外觀"：物體外觀損壞情況
      - "佔用"：物體是否被使用
      - "體驗"：用戶使用體驗
      - "預約"：物體是否需要預約
      - "清潔"：物體的清潔狀態
      - "空位"：是否還有空位
      - "人潮"：周圍是否聚集很多人
      - "噪音"：物體發出的聲音大小
      - "氣味"：是否有異味

      # 使用範例
      範例一:
      用戶：我想要回報人社1館面向竹湖中間的一般座位區太吵了。
      回答：
      {
          "樓層": "一樓",
          "參照點": ["竹湖"],
          "物體": "一般座位區",
          "物體狀態": "噪音"
      }

      範例二:
      用戶：工程五館附近的飲水機水槽有污漬。
      回答：
      {
          "樓層": "一樓",
          "參照點": ["工程五館"],
          "物體": "飲水機",
          "物體狀態": "清潔"
      }

      範例三:
      用戶：離人社一館最近的販賣機有飲料打翻。
      回答：
      {
          "樓層": "一樓",
          "參照點": ["人社一館"],
          "物體": "販賣機",
          "物體狀態": "清潔"
      }

      範例四:
      用戶：圖書館二樓最靠近lala kitchen和最靠近工程五管的飲水機壞了
      回答：
      {
          "樓層": "二樓",
          "參照點": ["LALA Kitchen","工程五館"],
          "物體": "飲水機",
          "物體狀態": "功能"
      }
`;

const prompt2_lite = `
  # Instructions:
  1. "物體"計算方式：
    - 物體滿相似度分數滿分為40
    - 物體和樓層或編號完全相同時，得到全分100%（40）。
    - 物體類型相同但"樓層和編號"不同時，得到半分50%（20）。
    - 物體類型不同但"樓層和編號"皆相同時，得到半分50%（20）。
    - 物體類型和樓層編號都不同，得分0。
  2. "回報狀態"計算方式：
    - 回報狀態分數滿分為20
    - 當狀態一樣則得全部20，否則0。
  3. "回報時間"計算方式：
    - 請根據時間的接近程度，使用你的認知給出一個最高20分，最低0分的相似度分數。
  4. "位址"計算方式：
    - 請根據地理位置的接近程度，使用你的認知給出一個最高20分，最低0分的相似度分數，使用常識來判斷距離的影響。
  5. 總相似度分數：
    - 總分 = 物體相似度分數 + 回報狀態相似度分數 + 回報時間相似度分數 + 位址相似度分數
`;

const location_candidate = [
  "管理二館",
  "工程四館",
  "工程五館",
  "人社一館",
  "人社二館",
  "人社三館",
  "小木屋",
  "LALA Kitchen",
  "行政大樓",
  "竹湖",
  "科學一館",
];

const item_candidate = [
  "公用印表機",
  "飲水機",
  "跑步機",
  "公用電腦",
  "高腳椅區",
  "置物櫃",
  "沙發區",
  "一般座位區",
];

const status_candidate = [
  "保養",
  "功能",
  "外觀",
  "佔用",
  "體驗",
  "預約",
  "清潔",
  "空位",
  "人潮",
  "噪音",
  "氣味",
];

async function def_place_and_object(text: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: prompt_lite,
      },
      { role: "user", content: text },
    ],
    max_tokens: 100,
    temperature: 0,
    top_p: 0.01,
  });
  const ans = response.choices[0].message.content;
  console.log(`LLM1 Used tokens: ${response.usage?.total_tokens}`);

  return ans;
}

function transFloorFromChineseToNumber(floor: string) {
  switch (floor) {
    case "一樓":
      return 1;
    case "二樓":
      return 2;
    case "三樓":
      return 3;
    case "四樓":
      return 4;
    default:
      return 1;
  }
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  function toRad(x: number) {
    return (x * Math.PI) / 180;
  }

  const R = 6371000; // 地球半徑，單位為米
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function find_closest_facility(
  id: string,
  floor: string,
  location: string,
  item: string,
) {
  const locationPosition = (
    referenceData as {
      locationName: string;
      coordinates: { latitude: number; longitude: number };
    }[]
  ).find((item) => item.locationName === location)?.coordinates;

  const floorNumber = transFloorFromChineseToNumber(floor);

  const candidateMarkersPosition =
    id === "m" ? multiFloorMarkersPosition : markersPosition;

  const itemPositions = Object.entries(candidateMarkersPosition).find(([key]) =>
    key.startsWith(item),
  )?.[1];

  const filteredItemPositions = Object.entries(itemPositions ?? {}).reduce(
    (acc: { [key: string]: { 位址: number[] } }, [key, value]) => {
      const tmpFloorNumber = parseInt(
        key.split("-")[0].match(/\d+$/)?.[0] ?? "1",
      );
      if (tmpFloorNumber === floorNumber) {
        acc[key] = value as { 位址: number[] };
      }
      return acc;
    },
    {},
  );

  interface ItemDistance {
    distance: number | undefined;
    key: string;
  }

  const closestItem = Object.entries(filteredItemPositions ?? {}).reduce(
    (acc: ItemDistance, [key, value]) => {
      const distance = locationPosition
        ? haversineDistance(
            locationPosition.latitude,
            locationPosition.longitude,
            (value as { 位址: [number, number] }).位址[0],
            (value as { 位址: [number, number] }).位址[1],
          )
        : undefined;
      if (
        acc.distance === undefined ||
        (distance !== undefined && distance < acc.distance)
      ) {
        acc.distance = distance;
        acc.key = key;
      }
      return acc;
    },
    { distance: undefined, key: "" },
  );

  const itemAddress = filteredItemPositions[closestItem.key]?.位址;

  return { closestItemName: closestItem.key, itemAddress };
}

function find_closest_facility_multi_location(
  id: string,
  floor: string,
  location: string,
  location2: string,
  item: string,
) {
  const location1Position = (
    referenceData as {
      locationName: string;
      coordinates: { latitude: number; longitude: number };
    }[]
  ).find((item) => item.locationName === location)?.coordinates;

  const location2Position = (
    referenceData as {
      locationName: string;
      coordinates: { latitude: number; longitude: number };
    }[]
  ).find((item) => item.locationName === location2)?.coordinates;

  const floorNumber = transFloorFromChineseToNumber(floor);

  const candidateMarkersPosition =
    id === "m" ? multiFloorMarkersPosition : markersPosition;

  const itemPositions = Object.entries(candidateMarkersPosition).find(([key]) =>
    key.startsWith(item),
  )?.[1];

  const filteredItemPositions = Object.entries(itemPositions ?? {}).reduce(
    (acc: { [key: string]: { 位址: number[] } }, [key, value]) => {
      const tmpFloorNumber = parseInt(
        key.split("-")[0].match(/\d+$/)?.[0] ?? "1",
      );
      if (tmpFloorNumber === floorNumber) {
        acc[key] = value as { 位址: number[] };
      }
      return acc;
    },
    {},
  );

  interface ItemDistance {
    distance: number | undefined;
    key: string;
  }

  const closestItem = Object.entries(filteredItemPositions ?? {}).reduce(
    (acc: ItemDistance, [key, value]) => {
      const itemPosition = (value as { 位址: [number, number] }).位址;
      const distance1 = location1Position
        ? haversineDistance(
            itemPosition[0],
            itemPosition[1],
            location1Position.latitude,
            location1Position.longitude,
          )
        : undefined;
      const distance2 = location2Position
        ? haversineDistance(
            itemPosition[0],
            itemPosition[1],
            location2Position.latitude,
            location2Position.longitude,
          )
        : undefined;
      const distanceSum = (distance1 ?? 0) + (distance2 ?? 0);
      if (
        acc.distance === undefined ||
        (distanceSum !== 0 && distanceSum < acc.distance)
      ) {
        acc.distance = distanceSum;
        acc.key = key;
      }
      return acc;
    },
    { distance: undefined, key: "" },
  );

  const itemAddress = filteredItemPositions[closestItem.key]?.位址;

  return { closestItemName: closestItem.key, itemAddress };
}

async function def_facility(location: string, item: string) {
  const locationPosition = (
    referenceData as {
      locationName: string;
      coordinates: { latitude: number; longitude: number };
    }[]
  ).find((item) => item.locationName === location)?.coordinates;

  const itemPositions = Object.entries(markersPosition).find(([key]) =>
    key.startsWith(item),
  )?.[1];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "你可以幫我根據這句話的參考點位址，找到以下清單中最符合的物體點，並告訴我你是怎麼判斷的",
      },
      {
        role: "system",
        content: JSON.stringify(itemPositions),
      },
      { role: "system", content: "【注意事項】：只要回答物體點的名稱。" },
      {
        role: "user",
        content: `參考點: ${location}, 位址: ${JSON.stringify(
          locationPosition,
        )}\n結果:`,
      },
    ],
    max_tokens: 100,
    temperature: 0,
    top_p: 0.01,
  });
  const ans = response.choices[0].message.content;

  return ans;
}

async function def_contribution(
  contributions: PoisForGpt,
  targetMarker: string,
  targetAddress: number[],
  status: string,
) {
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Taipei",
  });

  const statusEn = changeStatusToEnglish(status);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "你可以幫我根據這句話的物體、回報狀態、回報時間和位址，找到兩個最符合的不同回報點",
      },
      {
        role: "system",
        content: JSON.stringify(contributions),
      },
      {
        role: "system",
        content:
          '【注意事項】：只要回答回報點的ID。 像是 {\
            "key1": "p02-S-A-LL-S-rp4",\
            "key2": "p02-S-A-LL-S-rp6"\
          }',
      },
      { role: "system", content: "【注意事項】：請以 Json 格式回覆我。" },
      {
        role: "user",
        content: `物體: ${targetMarker}, 回報狀態: ${statusEn}, 回報時間: ${currentTime}, 位址: ${targetAddress}\n結果:`,
      },
    ],
    max_tokens: 100,
    temperature: 0,
    top_p: 0.01,
  });
  const ans = response.choices[0].message.content;
  if (ans === null) {
    throw new Error("No recommand found.");
  }

  return ans;
}

async function def_contribution_improve(
  contributions: PoisForGpt,
  targetMarker: string,
  targetAddress: number[],
  status: string,
) {
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Taipei",
  });

  const statusEn = changeStatusToEnglish(status);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "分析提供的物體、回報狀態、回報時間和位址資訊，並與資料庫中的每個項目進行比較。由高到低返回所有總分超過60分的項目ID，並以JSON格式返回，其中keys為連續數字，值為ID。",
      },
      {
        role: "system",
        content: prompt2_lite,
      },
      {
        role: "system",
        content: "資料庫：\n" + JSON.stringify(contributions),
      },
      {
        role: "user",
        content: `物體: ${targetMarker}, 回報狀態: ${statusEn}, 回報時間: ${currentTime}, 位址: ${targetAddress}\n結果:`,
      },
    ],
    max_tokens: 500,
    temperature: 0,
    top_p: 0.01,
  });
  const ans = response.choices[0].message.content;
  console.log(`LLM3 Used tokens: ${response.usage?.total_tokens}`);
  if (ans === null) {
    throw new Error("No recommand found.");
  }

  return ans;
}

function formatJsonData(input: string): string {
  // Check if the input matches the pattern
  if (input.match(/```json\n([\s\S]*?)\n```/)) {
    // Extract JSON from the input using a regular expression
    const jsonMatch = input.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      // Format the extracted JSON string into a TypeScript constant
      const formattedJson = jsonMatch[1];
      return formattedJson;
    } else {
      console.error("No JSON data found");
      return "";
    }
  } else {
    // If the input does not match the pattern, return it as is
    return input;
  }
}

function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function random_array(array: string[]): string {
  return array[Math.floor(Math.random() * array.length)];
}

function handleMultipleLocations(location: string[]): string[] {
  if (location.length > 1) {
    let location1 = location[0];
    let location2 = location[1];

    if (!location_candidate.includes(location1)) {
      location1 = random_array(location_candidate);
    }

    if (!location_candidate.includes(location2)) {
      location2 = random_array(location_candidate);
    }

    return [location1, location2];
  } else {
    let location1 = location[0];

    if (!location_candidate.includes(location1)) {
      location1 = random_array(location_candidate);
    }

    return [location1];
  }
}

function handleItem(item: string): string {
  if (item_candidate.includes(item)) {
    return item;
  } else {
    return random_array(item_candidate);
  }
}

function handleStatus(status: string): string {
  if (status_candidate.includes(status)) {
    return status;
  } else {
    return random_array(status_candidate);
  }
}

export {
  def_place_and_object,
  def_facility,
  def_contribution,
  def_contribution_improve,
  find_closest_facility,
  find_closest_facility_multi_location,
  formatJsonData,
  isJsonString,
  handleMultipleLocations,
  handleItem,
  handleStatus,
};
