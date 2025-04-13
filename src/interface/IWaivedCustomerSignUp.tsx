export interface IWaivedCustomerSignUp {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  address: string;
  profileImageUrl?: string;
  vendorDetails?: {
    businessName: string;
    businessType: string;
    businessDescription: string;
    localGovernmentId: string;
    currency: string;
    vendorTypeEnum: number;
  };
  customerDetails?: {
    preferredMarket: string;
    localGovernmentId: string;
  };
  advertiserDetails?: {
    companyName: string;
    businessType: string;
    website: string;
  };
}
