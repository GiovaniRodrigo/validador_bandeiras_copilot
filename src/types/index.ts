export interface CardDetails {
  number: string;
  expiryDate: string;
  cvv: string;
  country: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}