const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const XLSX = require('xlsx');

const getProductList = async (pageNum) => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  // 새로운 페이지를 연다.
  const page = await browser.newPage();
  // 페이지의 크기를 설정한다.
  await page.setViewport({
    width: 1366,
    height: 768,
  });
  // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
  let productList = [];

  await page.goto(`https://th.iherb.com/c/categories?p=${pageNum}`);

  const content = await page.content();
  // $에 cheerio를 로드한다.
  const $ = cheerio.load(content);
  // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
  const lists = $(
    '#FilteredProducts > div.panel-stack.defer-block > div:nth-child(2) > div.products.product-cells.clearfix > div:nth-child(n)'
  );
  // 모든 리스트를 순환한다.
  lists.each((index, list) => {
    const name = $(list).find('div.product-title').text().trim();
    const prodUrl = $(list).find('div.absolute-link-wrapper > a').attr('href');
    const rating = $(list).find('a.stars.scroll-to').attr('title');
    const reviewCnt = $(list).find(' a.rating-count.scroll-to > span').text();
    const discountedPrice = $(list)
      .find('span.price.discount-red')
      .text()
      .trim();
    const price = $(list).find('span.price').text().trim();

    productList.push({
      name,
      prodUrl,
      rating,
      reviewCnt,
      discountedPrice,
      price,
    });
  });

  const workSheet = XLSX.utils.json_to_sheet(productList);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
  XLSX.writeFile(workBook, `./temp/sample_${new Date().toDateString()}.xlsx`);

  browser.close();
};

module.exports = { getProductList };
