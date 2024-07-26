const { getProductDetail } = require('./utils/getProductDetail');
const { getProductList } = require('./utils/getProductList');
const { connectSpreadSheet } = require('./utils/utils');

connectSpreadSheet().then(async (doc) => {
  await doc.loadInfo();
  console.log(doc.title);
  // 페이지 단위로 getProductList 저장
  // 구글 스프레드 시트에 1행씩 저장
  // 만약 실패시 마지막 행에 있는 페이지 기준으로 다시 크롤링 시작
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const pages = rows.map((row) => row.get('page'));
  const lastPage = pages[pages.length - 1];
  let i = Number(lastPage) + 1 || 1;
  try {
    while (true) {
      let products = await getProductList(i);
      console.log('크롤링 성공', products);
      await sheet.addRows(products);
      i++;
    }
  } catch (e) {
    console.log(e);
    console.log('page : ', i);
  }
  // 마지막으로 크롤링한 페이지를 기준으로 크롤링을 이어서 진행함.
});
