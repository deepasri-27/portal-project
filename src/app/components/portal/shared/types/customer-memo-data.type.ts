export type MemoItem = {
  memoId: string;         // Memo document ID
  memoType: string;       // Type of memo (e.g., Credit, Debit)
  referenceDoc: string;   // Related document (e.g., sales order)
  customerId: string;     // Customer number
  customerName: string;   // Customer name
  billingDate: string;    // Billing date (usually 'YYYYMMDD')
  createdDate: string;    // Creation date (usually 'YYYYMMDD')
  createdBy: string;      // Creator username
  currency: string;       // Currency (e.g., 'USD')
  netValue: string;       // Net amount (as string; can convert to number)
  taxAmount: string;      // Tax amount (as string; can convert to number)
  salesOrg: string;       // Sales organization
  distChannel: string;    // Distribution channel
  division: string;       // Division
};

