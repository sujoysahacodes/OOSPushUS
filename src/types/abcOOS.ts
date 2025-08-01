// Types for ABC OOS scenario
export type Warehouse = {
  id: string;
  name: string;
  location: string;
  inventory: Record<string, number>; // productId -> quantity
};

export type Wholesaler = {
  id: string;
  name: string;
  location: string;
  forecast: Record<string, number>; // productId -> forecasted quantity
  lastOrder: Record<string, number>; // productId -> last ordered quantity
};

export type Product = {
  id: string;
  name: string;
  category: string;
};

export type ChangeRequest = {
  id: string;
  wholesalerId: string;
  productId: string;
  requestedQty: number;
  source: 'email' | 'servicenow';
  receivedAt: string;
  parsed: boolean;
};

export type ShipmentPlan = {
  requestId: string;
  warehouseId: string;
  wholesalerId: string;
  productId: string;
  allocatedQty: number;
};
