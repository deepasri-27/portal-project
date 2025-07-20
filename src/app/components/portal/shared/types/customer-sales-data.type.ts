export type CustSalesDataType = {
  vbeln: string;  // Sales document number
  erdat: string;  // Creation date (format: 'YYYYMMDD')
  ernam: string;  // Created by (username)
  netwr: string;  // Net value (amount as string)
  waerk: string;  // Currency (e.g., 'USD')
  matnr: string;  // Material number
  arktx: string;  // Material description
};
