export type CustDeliveryItem = {
  vbeln: string;  // Delivery document number
  erdat: string;  // Creation date (YYYYMMDD)
  vstel: string;  // Shipping point/receiving point
  vkorg: string;  // Sales organization
  lfart: string;  // Delivery type
  lfdat: string;  // Delivery date (YYYYMMDD)
  posnr: string;  // Item number of the SD document
  matnr: string;  // Material number
  arktx: string;  // Material description
  lfimg: number;  // Delivery quantity
};
