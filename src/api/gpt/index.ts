import OpenAI from "openai";
import env from "../../constants/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function def_place_and_object(text: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "【地點】 \
            1.人社一館 \
            2.工程五館",
      },
      {
        role: "system",
        content:
          "【物體】 \
            1.飲水機 \
            2.販賣機 \
            3.跑步機 \
            4.一般座位區",
      },
      {
        role: "system",
        content:
          "【回報狀態】 \
            1.整潔: 乾淨程度 \
            2.噪音: 聲音 \
            3.占用: 是否被使用 \
            4.保養: 是否在保養",
      },
      { role: "system", content: "【注意事項】：不要回答上述沒提到的名稱。" },
      {
        role: "system",
        content: "你可以幫我分類這句話提到的地點、物體和回報狀態",
      },
      { role: "user", content: "我想要回報" + text },
    ],
    max_tokens: 100,
    temperature: 0,
    top_p: 1,
  });
  const ans = response.choices[0].message.content;

  return ans;
}

async function def_facility() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "你可以幫我根據這句話的參考點位址，找到最符合的物體點",
      },
      {
        role: "system",
        content:
          "【物體點】： \
						飲水機1-1: {位址: [24.786852512077758, 120.99864089720543]}\
						飲水機1-2: {位址: [24.786832017985837, 120.99864089720543]} \
						飲水機1-3: {位址: [24.78607450621745, 120.997316889253]}",
      },
      { role: "system", content: "【注意事項】：只要回答物體點的名稱。" },
      {
        role: "user",
        content:
          "參考點: 工程五館, 位址: [24.78607450621745, 120.997316889253]\n結果:",
      },
    ],
    max_tokens: 100,
    temperature: 0,
    top_p: 1,
  });
  const ans = response.choices[0].message.content;

  console.log(ans);
  // console.log(response.choices[0]);
}

async function def_contribution() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "你可以幫我根據這句話的物體、回報狀態、回報時間和位址，找到兩個最符合的回報點",
      },
      {
        role: "system",
        content:
          "【回報點】： \
						firebaseid1: {物體: 飲水機1-3, 回報狀態: 整潔, 回報時間: 145, 位址: [24.78607450621745, 120.997316889253] \
						firebaseid2: {物體: 飲水機1-3, 回報狀態: 整潔, 回報時間: 123, 位址: [24.78640596499262, 120.99813786572372] \
						firebaseid3: {物體: 飲水機1-3, 回報狀態: 噪音, 回報時間: 123, 位址: [24.78607450621745, 120.997316889253] \
						firebaseid4: {物體: 飲水機1-3, 回報狀態: 整潔, 回報時間: 123, 位址: [24.78607450621745, 120.997316889253] \
                                           ",
      },
      { role: "system", content: "【注意事項】：只要回答回報點的名稱。" },
      {
        role: "user",
        content:
          "物體: 飲水機1-3, 回報狀態: 整潔, 回報時間: 100, 位址: [24.78607450621745, 120.997316889253]\n結果:",
      },
    ],
    max_tokens: 100,
    temperature: 0,
    top_p: 1,
  });
  // The priority of judgment seems to be from left to right
  const ans = response.choices[0].message.content;

  console.log(ans);
}

export { def_place_and_object, def_facility, def_contribution };
