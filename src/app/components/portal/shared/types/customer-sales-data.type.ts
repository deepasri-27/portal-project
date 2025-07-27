export type CustSalesDataType = {
  vbeln: string;    // Sales document number
  erdat: string;    // Creation date (format: 'YYYYMMDD')
  auart: string;    // Sales document type
  netwr: string;    // Net value
  waerk: string;    // Currency
  vdat: string;     // Requested delivery date
  ernam: string;    // Created by
  posnr: string;    // Item number
  matnr: string;    // Material number
  arktx: string;    // Material description
  kwmeng: string;   // Order quantity
  vrkme: string;    // Sales unit
};
