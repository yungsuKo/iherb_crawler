const { JWT } = require('google-auth-library');
const creds = require('../config/productcrawler-429706-bda311332373.json');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const jwt = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: SCOPES,
});
const connectSpreadSheet = async () => {
  const doc = new GoogleSpreadsheet(
    '19yI2uH3U1q2LE5ohN0XHpu6niL26AO_unVhaFO6P8tA',
    jwt
  );
  //   await doc.loadInfo(); // loads document properties and worksheets
  return doc;
};

module.exports = { connectSpreadSheet };
