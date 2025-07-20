export type OverallSalesDataType = {
  waerk: string;             // Currency
  auart: string;             // Order type
  kunnr: string;             // Customer number
  vkorg: string;             // Sales organization
  record_type: string;       // Custom record type
  document_no: string;       // Document number
  doc_date: string;          // Document date
  total_orders: number;      // Total number of orders
  total_order_value: number; // Total order value
  total_billed: number;      // Total billed amount
};
