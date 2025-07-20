export type custInquiryDatatype={
  vbeln: string;  // Sales document number (e.g., inquiry number)
  erdat: string;  // Creation date, usually in 'YYYYMMDD'
  ernam: string;  // Creator username
  netwr: string;  // Net value (amount), often a string like '1234.56'
  waerk: string;  // Currency (e.g., 'USD', 'INR')
  matnr: string;  // Material number
  arktx: string;  // Material description

}

