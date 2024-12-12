export interface Billionaire {
  id: string;
  name: string;
  netWorth: number;
  country?: string;
  industries: string[];
  squareImage: string;
  thumbnail?: string;
  bio?: string[];
  about?: string[];
  state?: string;
  city?: string;
  position?: number;
  financialAssets?: FinancialAsset[];
}

interface FinancialAsset {
  exchange: string;
  ticker: string;
  companyName: string;
  numberOfShares: number;
  sharePrice: number;
  currencyCode: string;
  exchangeRate: number;
  interactive: boolean;
  currentPrice: number;
  exerciseOptionPrice?: number;
} 