import { useState } from 'react';
import CreditCardForm from '../components/CreditCardForm';

const Home = () => {
  const [country, setCountry] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleValidation = (result) => {
    setValidationResult(result);
  };

  return (
    <div>
      <h1>Credit Card Validator</h1>
      <select value={country} onChange={handleCountryChange}>
        <option value="">Select a country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="GB">United Kingdom</option>
        {/* Add more countries as needed */}
      </select>
      <CreditCardForm country={country} onValidate={handleValidation} />
      {validationResult && (
        <div>
          <h2>Validation Result:</h2>
          <p>{validationResult}</p>
        </div>
      )}
    </div>
  );
};

export default Home;