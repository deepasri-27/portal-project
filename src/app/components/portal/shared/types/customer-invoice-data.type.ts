export type CustInvoiceDataType = {
  vbeln: string;         // Billing document number
  fkdat: string;         // Billing date
  netwr: number;         // Net value (header level)
  waerk: string;         // Currency
  kunag: string;         // Sold-to party
  vkorg: string;         // Sales organization
  knumv: string;         // Document condition number
  fkart: string;         // Billing type
  posnr: string;         // Item number
  matnr: string;         // Material number
  arktx: string;         // Material description
  fkimg: number;         // Billing quantity
  vrkme: string;         // Sales unit
  item_netwr: number;    // Net value at item level
  prsdt: string;         // Pricing date
  erdat:string,
  ernam:string
};
