import OpenAI from "openai";
import env from "../../constants/env";
import referenceData from "../../assets/data/gpt/reference.json";
import markersPosition from "../../assets/data/gpt/markers-position.json";
import { PoisForGpt } from "../../models/poi";
import { changeStatusToEnglish } from "../../constants/gpt";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const prompt = `
        #指定楼层
        如果用戶未指定樓層，則默認為「一樓」，樓層選項：一樓、二樓、三樓、四樓

        #指定參照點
        - 管理二館
        - 工程五館
        - 工程四館
        - 人社一館
        - 人社二館
        - 人社三館
        - 小木屋
        - LALA Kitchen
        - 行政大樓
        - 竹湖
        - 科學一館

        #回報狀態
        根據不同情況使用以下標籤描述物體狀態，物體狀態：
        - 當判斷物體是否在保養，使用"保養"。
        - 當判斷物體的功能性，使用"功能"。
        - 當判斷物體的外觀是否有損壞，使用"外觀"。
        - 當判斷物體是否被使用，使用"佔用"。
        - 當判斷物體的使用體驗，使用"體驗"。
        - 當判斷物體是否預約，使用"預約"。
        - 當判斷物體是否乾淨，使用 "清潔"。
        - 當判斷物體是否還有位子，使用"空位"。
        - 當判斷物體時候很多人聚集在旁邊，使用"人潮"。
        - 當判斷物體的聲音吵雜程度，使用"噪音"。
        - 當判斷物體的是否有異味，使用"氣味"
        - 如果都不是以上情況，請使用"其他"。
       

        #使用範例:
        ##範例一
        用戶:我想要回報人設1管面向subway中間的一般座位區太吵了。
        回答:一樓，沒有參照點，一般座位區，噪音

        ##範例二
        用戶:工程五館附近的飲水機水槽有污漬
        回答:一樓，工程五館，飲水機，整潔

        ##範例三
        用戶:離人社一館最近的販賣機有飲料打翻
        回答:一樓，人社一館，販賣機，整潔

        ##範例四
        用戶:最靠近工程五館的一般座位區周遭有人在大聲喧嘩
        回答:一樓，工程五館，一般座位區，噪音

        ##範例五
        用戶:圖書館一樓最靠近 LALA Kitchen 的高腳椅區有些髒亂
        回答:一樓，LALA Kitchen，高腳椅區，整潔

        ##範例六
        用戶:圖書館二樓最靠近竹湖的公用印表機，目前無法正常運作
        回答:二樓，竹湖，公用印表機，功能

        ##範例七
        用戶:我想要回報行政大樓三樓面向Kfc中間的高腳椅壞掉了
        回答:三樓，沒有參照點，高腳椅，功能

        ##範例八
        用戶:回報工程3管靠近電子大樓的跑步機太髒
        回答:一樓，沒有參照點，跑步機，整潔

        ##範例九
        用戶:圖書館二樓最靠近lala kitchen和最靠近工程五管的飲水機壞了
        回答:二樓，LALA Kitchen 、工程五館，飲水機，功能

        ##範例九
        用戶:圖書館2樓最靠近管理二館&小木屋的跑步機壞了
        回答:二樓，管理二館、小木屋，跑步機，功能
      `;

// Need to change to return json format
async function def_place_and_object(text: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      { role: "user", content: text },
    ],
    max_tokens: 100,
    temperature: 0,
    top_p: 0.01,
  });
  const ans = response.choices[0].message.content;

  return ans;
}

function find_closest_facility(location: string, item: string) {
  console.log(location, item);
  const locationPosition = (
    referenceData as {
      locationName: string;
      coordinates: { latitude: number; longitude: number };
    }[]
  ).find((item) => item.locationName === location)?.coordinates;

  const itemPositions = Object.entries(markersPosition).find(([key]) =>
    key.startsWith(item),
  )?.[1];

  interface ItemPosition {
    distance: number | undefined;
    key: string;
  }

  const itemPosition = Object.entries(itemPositions ?? {}).reduce(
    (acc: ItemPosition, [key, value]) => {
      const distance = locationPosition
        ? Math.sqrt(
            Math.pow(value.位址[0] - locationPosition.latitude, 2) +
              Math.pow(value.位址[1] - locationPosition.longitude, 2),
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

  return itemPosition.key;
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
  status: string,
) {
  // get targetMarker position from markersPosition
  const category = targetMarker.replace(/-\d+/, "").replace(/\d+$/, "");
  const itemPositions: { [key: string]: { 位址: number[] } } =
    Object.entries(markersPosition).find(([key]) =>
      key.startsWith(category),
    )?.[1] || {};

  const address = itemPositions?.[targetMarker]?.位址;

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
          '【注意事項】：只要回答回報點的名稱。 像是 {\
            "key1": "p02-S-A-LL-S-rp4",\
            "key2": "p02-S-A-LL-S-rp6"\
          }',
      },
      { role: "system", content: "【注意事項】：請以 Json 格式回覆我。" },
      {
        role: "user",
        content: `物體: ${targetMarker}, 回報狀態: ${statusEn}, 回報時間: ${currentTime}, 位址: ${address}\n結果:`,
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

export {
  def_place_and_object,
  def_facility,
  def_contribution,
  find_closest_facility,
};
