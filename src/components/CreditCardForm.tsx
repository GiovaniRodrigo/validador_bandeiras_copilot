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

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry) {
      toast.error("Por favor, selecione um país.");
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
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="expiryDate" className={styles.formLabel}>Validade (MM/AA):</label>
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
          <label htmlFor="country" className={styles.formLabel}>Selecione o país:</label>
          <select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className={styles.formInput}
          >
            <option value="">Selecione um país</option>
            <option value="US">Estados Unidos</option>
            <option value="CA">Canadá</option>
            <option value="GB">Reino Unido</option>
            <option value="BR">Brasil</option>
            {/* Adicione mais países conforme necessário */}
          </select>
        </div>
        <button type="submit" className={styles.formButton}>Validar</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default CreditCardForm;