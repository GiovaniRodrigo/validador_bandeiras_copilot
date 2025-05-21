import React, { useState } from 'react';

const CreditCardForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [country, setCountry] = useState('');
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the validation function from utils/validateCard here
    // Example: const result = validateCard(cardNumber, country);
    // setValidationResult(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="country">Select Country:</label>
        <select
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option value="">Select a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          {/* Add more countries as needed */}
        </select>
      </div>
      <button type="submit">Validate</button>
      {validationResult && <p>{validationResult}</p>}
    </form>
  );
};

export default CreditCardForm;