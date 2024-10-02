import router from 'next/router';
import { useEffect, useState } from 'react';

interface Practice {
  SE_Practice: string;
  SE_Claim: string[];
}

export default function SEPractices() {
  const [sePractices, setSEPractices] = useState<Practice[]>([]);
  const [selectedPractice, setSelectedPractice] = useState<string>('');
  const [selectedClaim, setSelectedClaim] = useState<string>('');

  useEffect(() => {
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

  const selectedPracticeObj = sePractices.find(practice => practice.SE_Practice === selectedPractice);

  const handleSubmit = () => {
    if (selectedPractice && selectedClaim) {
      router.push(`/Articles?practice=${selectedPractice}&claim=${selectedClaim}`);
    }
  };

  return (
    <div className='list_Wrapper'>
      <div className='list_Display' style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '2em' }}>Select a Software Engineering Practice</h1>
        
        <select value={selectedPractice} onChange={handlePracticeSelect} style={{ margin: '10px', padding: '10px', fontSize: '1em' }}>
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
            <select value={selectedClaim} onChange={handleClaimSelect} style={{ margin: '10px', padding: '10px', fontSize: '1em' }}>
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
          <p>You selected the claim: <strong>{selectedClaim}</strong></p>
        )}

        {selectedPractice && selectedClaim && (
          <button onClick={handleSubmit} className='button' style={{ margin: '10px', padding: '10px 20px', fontSize: '1em', backgroundColor: '#2980b9', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
