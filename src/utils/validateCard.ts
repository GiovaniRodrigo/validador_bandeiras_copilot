export interface CardDetails {
  number: string;
  expiryDate: string;
  cvv: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

// 1. Interface comum para estratégias de validação
interface CardValidationStrategy {
  validate(cardDetails: CardDetails): ValidationResult;
}

// 2. Estratégia padrão (default)
class DefaultValidationStrategy implements CardValidationStrategy {
  validate(cardDetails: CardDetails): ValidationResult {
    // Adiciona log para exibir os dados informados pelo usuário
    console.log("Dados informados pelo usuário:", cardDetails);

    const { number, expiryDate, cvv } = cardDetails;
    if (!number || !expiryDate || !cvv) {
      console.error("Erro de validação: Todos os campos são obrigatórios.");
      return { isValid: false, message: "All fields are required." };
    }
    const isValidNumber = /^[0-9]{16}$/.test(number);
    const isValidExpiry = /^\d{2}\/\d{2}$/.test(expiryDate);
    const isValidCvv = /^[0-9]{3,4}$/.test(cvv);

    if (!isValidNumber) {
      console.error("Erro de validação: Número do cartão inválido.");
      return { isValid: false, message: "Invalid card number." };
    }
    if (!isValidExpiry) {
      console.error("Erro de validação: Data de validade inválida.");
      return { isValid: false, message: "Invalid expiry date." };
    }
    if (!isValidCvv) {
      console.error("Erro de validação: CVV inválido.");
      return { isValid: false, message: "Invalid CVV." };
    }

    return { isValid: true, message: "Card is valid." };
  }
}

// 3. Estratégia para o Brasil
class BrazilValidationStrategy extends DefaultValidationStrategy {
  validate(cardDetails: CardDetails): ValidationResult {
    const baseResult = super.validate(cardDetails);
    if (!baseResult.isValid) return baseResult;

    const { number, expiryDate, cvv } = cardDetails;

    // Luhn algorithm
    const cleanNumber = number.replace(/\s+/g, "");
    let sum = 0;
    const reversed = cleanNumber.split("").reverse().join("");
    for (let i = 0; i < reversed.length; i++) {
      let n = parseInt(reversed[i], 10);
      if (i % 2 === 1) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
    }
    if (sum % 10 !== 0) {
      console.error("Erro de validação: Número do cartão inválido (Luhn).", { number, expiryDate, cvv, country: 'Brazil' });
      return { isValid: false, message: "Invalid card number (Luhn check failed)." };
    }
    return { isValid: true, message: "Card is valid." };
  }
}

// 4. Factory para escolher a estratégia
function getValidationStrategy(country: string): CardValidationStrategy {
  switch (country.toLowerCase()) {
    case "brazil":
      return new BrazilValidationStrategy();
    default:
      return new DefaultValidationStrategy();
  }
}

// 5. Função principal usando o Strategy
export function validateCard(cardDetails: CardDetails, country: string): ValidationResult {
  const strategy = getValidationStrategy(country);
  return strategy.validate(cardDetails);
}