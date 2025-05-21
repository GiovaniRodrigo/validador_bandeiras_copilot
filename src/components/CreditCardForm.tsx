import React, { useState } from 'react';
import styles from './form.module.css';
import { validateCard } from '../utils/validateCard';
import { CardDetails } from '../types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CreditCardFormProps {
  country: string;
  onValidate: (result: string) => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({ country, onValidate }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(country);
  const [cardNumberError, setCardNumberError] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [cvvError, setCvvError] = useState('');

  const validateCardNumber = (value: string) => {
    if (!/^\d{13,19}$/.test(value)) {
      setCardNumberError('Número inválido. Digite apenas números (13-19 dígitos).');
      return false;
    }
    setCardNumberError('');
    return true;
  };

  const validateExpiryDate = (value: string) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      setExpiryDateError('Formato inválido. Use MM/AA.');
      return false;
    }
    setExpiryDateError('');
    return true;
  };

  const validateCvv = (value: string) => {
    if (!/^\d{3,4}$/.test(value)) {
      setCvvError('CVV inválido. Digite 3 ou 4 números.');
      return false;
    }
    setCvvError('');
    return true;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
    validateCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
    validateExpiryDate(e.target.value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value);
    validateCvv(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCardValid = validateCardNumber(cardNumber);
    const isExpiryValid = validateExpiryDate(expiryDate);
    const isCvvValid = validateCvv(cvv);

    if (!isCardValid || !isExpiryValid || !isCvvValid) {
      return;
    }
    const cardDetails: CardDetails = {
      number: cardNumber,
      expiryDate,
      cvv,
      country: selectedCountry,
    };
    const result = validateCard(cardDetails, selectedCountry);
    if (!result.isValid) {
      toast.error(result.message); // Certifique-se que result.message está em português no validateCard
    }
    onValidate(result.message);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="cardNumber" className={styles.formLabel}>Número do cartão:</label>
          <input
            type="text"
            id="cardNumber"
            required
            className={styles.formInput}
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
            inputMode="numeric"
            pattern="\d{13,19}"
            placeholder="Digite o número do cartão"
          />
          {cardNumberError && <span className={styles.error}>{cardNumberError}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="expiryDate" className={styles.formLabel}>Validade (MM/AA):</label>
          <input
            type="text"
            id="expiryDate"
            required
            className={styles.formInput}
            value={expiryDate}
            onChange={handleExpiryDateChange}
            maxLength={5}
            placeholder="MM/AA"
            pattern="\d{2}/\d{2}"
          />
          {expiryDateError && <span className={styles.error}>{expiryDateError}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cvv" className={styles.formLabel}>CVV:</label>
          <input
            type="text"
            id="cvv"
            required
            className={styles.formInput}
            value={cvv}
            onChange={handleCvvChange}
            maxLength={4}
            inputMode="numeric"
            pattern="\d{3,4}"
            placeholder="CVV"
          />
          {cvvError && <span className={styles.error}>{cvvError}</span>}
        </div>
        <button type="submit" className={styles.formButton}>Validar</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreditCardForm;