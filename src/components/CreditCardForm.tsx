import React, { useState } from 'react';
import styles from './form.module.css';
import { validateCard } from '../utils/validateCard';
import { CardDetails } from '../types';

interface CreditCardFormProps {
  country: string;
  onValidate: (result: string) => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ country, onValidate }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cardDetails: CardDetails = {
      number: cardNumber,
      expiryDate,
      cvv,
      country,
    };
    const result = validateCard(cardDetails, country);
    onValidate(result.message);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="cardNumber" className={styles.formLabel}>Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
          className={styles.formInput}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="expiryDate" className={styles.formLabel}>Expiry Date (MM/YY):</label>
        <input
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          className={styles.formInput}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="cvv" className={styles.formLabel}>CVV:</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
          className={styles.formInput}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="country" className={styles.formLabel}>Select Country:</label>
        <select
          id="country"
          value={country}
          className={styles.formInput}
        >
          <option value="">Select a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          {/* Add more countries as needed */}
        </select>
      </div>
      <button type="submit" className={styles.formButton}>Validate</button>
    </form>
  );
};

export default CreditCardForm;