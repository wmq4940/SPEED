import router from 'next/router';
import { useEffect, useState } from 'react';
import styles from './SEPractices.module.css'; // Import the CSS module

interface Practice {
  SE_Practice: string;
  SE_Claim: string[];
}

export default function SEPractices() {
  const [sePractices, setSEPractices] = useState<Practice[]>([]);
  const [selectedPractice, setSelectedPractice] = useState<string>('');
  const [selectedClaim, setSelectedClaim] = useState<string>('');

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/se');
        const data = await response.json();
        setSEPractices(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePracticeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPractice(e.target.value);
    setSelectedClaim('');
  };

  const handleClaimSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClaim(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedPractice && selectedClaim) {
      router.push(`/Articles?practice=${selectedPractice}&claim=${selectedClaim}`);
    }
  };

  const selectedPracticeObj = sePractices.find(
    (practice) => practice.SE_Practice === selectedPractice
  );

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <select
          value={selectedPractice}
          onChange={handlePracticeSelect}
          className={styles.select}
        >
          <option value="">Select a practice</option>
          {sePractices.map((practice, index) => (
            <option key={index} value={practice.SE_Practice}>
              {practice.SE_Practice}
            </option>
          ))}
        </select>

        {selectedPractice && selectedPracticeObj && (
          <select
            value={selectedClaim}
            onChange={handleClaimSelect}
            className={styles.select}
          >
            <option value="">Select a claim</option>
            {selectedPracticeObj.SE_Claim.map((claim, index) => (
              <option key={index} value={claim}>
                {claim}
              </option>
            ))}
          </select>
        )}

        {selectedPractice && selectedClaim && (
          <button onClick={handleSubmit} className={styles.button}>
            Search
          </button>
        )}
      </div>
    </div>
  );
}
