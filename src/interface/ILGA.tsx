export interface LGA {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  code: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  lastModifiedBy: string;
  lastModifiedAt: string;
  totalMarkets: number;
  activeMarkets: number;
  totalTraders: number;
  totalRevenue: number;
}
