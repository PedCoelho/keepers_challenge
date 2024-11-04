export enum DealCategories {
  ACQUISITIONS = 'acquisitions',
  DEVELOPMENT = 'development',
  ASSET_MANAGEMENT = 'asset-management',
  BRIDGE_LENDING = 'bridge-lending',
}

export interface DealFilters {
  purchaseMin?: number;
  purchaseMax?: number;
}

export interface Deal {
  name: string;
  purchasePrice: number;
  address: string;
  netOperatingIncome: number;
  category: DealCategories;
  capRate: number;
}
