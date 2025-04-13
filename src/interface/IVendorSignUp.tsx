interface VendorDetails {
  businessName: string;
  localGovernmentId: string;
  currency: string;
}

export interface IVendorSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  address: string;
  vendorDetails: VendorDetails;
}
