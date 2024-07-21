const { getProductDetail } = require('./utils/getProductDetail');
const { getProductList } = require('./utils/getProductList');
const { connectSpreadSheet } = require('./utils/utils');

console.log(process.env.TEST);
connectSpreadSheet().then(async (doc) => {
  await doc.loadInfo();
  console.log(doc.title);
  // 페이지 단위로 getProductList 저장

  // 마지막으로 크롤링한 페이지를 기준으로 크롤링을 이어서 진행함.
});
