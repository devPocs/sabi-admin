export interface ICreateWaivedProduct {
  productName: "string";
  imageUrl: string;
  price: number;
  isAvailbleForUrgentPurchase: boolean;
  currencyType: number;
}
