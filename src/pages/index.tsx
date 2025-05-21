import React, { useState, ChangeEvent } from 'react';
import CreditCardForm from '../components/CreditCardForm';
import styles from './index.module.css'; // Importa o CSS module

const Home: React.FC = () => {
  const [country, setCountry] = useState<string>('');
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  const handleValidation = (result: string) => {
    setValidationResult(result);
  };

  return (
    <div>
      <h1 className={styles.title}>Validador de Cartão de Crédito</h1>

      <div className={styles.container}>

        <CreditCardForm country={country} onValidate={handleValidation} />

        {validationResult && (
          <div className={styles.validationResult}>
            <h2>Resultado da Validação:</h2>
            <p>{validationResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;