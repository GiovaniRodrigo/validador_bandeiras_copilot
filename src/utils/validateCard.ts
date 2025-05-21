export interface CardDetails {
  number: string;
  expiryDate: string;
  cvv: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validateCard(cardDetails: CardDetails, country: string): ValidationResult {
  const { number, expiryDate, cvv } = cardDetails;

  // Basic validation logic (to be expanded based on country rules)
  if (!number || !expiryDate || !cvv) {
    return { isValid: false, message: "All fields are required." };
  }

  // Example validation rules (these should be replaced with actual country-specific rules)
  const isValidNumber = /^[0-9]{16}$/.test(number);
  const isValidExpiry = /^\d{2}\/\d{2}$/.test(expiryDate);
  const isValidCvv = /^[0-9]{3,4}$/.test(cvv);

  if (!isValidNumber) {
    return { isValid: false, message: "Invalid card number." };
  }
  if (!isValidExpiry) {
    return { isValid: false, message: "Invalid expiry date." };
  }
  if (!isValidCvv) {
    return { isValid: false, message: "Invalid CVV." };
  }

  // Additional country-specific validation can be added here

  return { isValid: true, message: "Card is valid." };
}