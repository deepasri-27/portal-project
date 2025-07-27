export type VmemoDataType = {
  memoId: string;
  memoType: string;
  referenceDoc: string;
  customerId: string;
  customerName: string;
  billingDate: string;      // If you prefer a Date object, change to: Date
  createdDate: string;      // Or Date
  createdBy: string;
  currency: string;
  netValue: string;         // Or number if you plan to do calculations
  taxAmount: string;        // Or number
  salesOrg: string;
  distChannel: string;
  division: string;
  direction: string;
}
