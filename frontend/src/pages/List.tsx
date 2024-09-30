interface Practice {
    SE_Practice: string;
    SE_Claim: string[];
  }

import router from 'next/router';
import { useEffect, useState } from 'react';

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
  }, []); // Empty dependency array means this will only run once when the component mounts

  const handlePracticeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPractice(e.target.value);
    setSelectedClaim(''); // Reset selected claim when practice changes
  };

  const handleClaimSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClaim(e.target.value);
  };

  const selectedPracticeObj = sePractices.find(practice => practice.SE_Practice === selectedPractice);

  const handleSubmit = () => {
    if (selectedPractice && selectedClaim) {
      router.push(`/Articles?practice=${selectedPractice}&claim=${selectedClaim}`);
    }
  };

  return (
    <div>
      <h1>Select an SE Practice</h1>
      <select value={selectedPractice} onChange={handlePracticeSelect}>
        <option value="">Select a practice</option>
        {sePractices.map((practice, index) => (
          <option key={index} value={practice.SE_Practice}>
            {practice.SE_Practice}
          </option>
        ))}
      </select>

      {selectedPractice && selectedPracticeObj && (
        <div>
          <h2>Select a Claim</h2>
          <select value={selectedClaim} onChange={handleClaimSelect}>
            <option value="">Select a claim</option>
            {selectedPracticeObj.SE_Claim.map((claim, index) => (
              <option key={index} value={claim}>
                {claim}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedClaim && (
        <p>You selected the claim: {selectedClaim}</p>
      )}

{selectedPractice && selectedClaim && (
        <button onClick={handleSubmit} className='button'>
          Submit
        </button>
      )}
    </div>

    
  );
}