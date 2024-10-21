// SEPractices.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SEPractices from '@/pages/List'; 
import '@testing-library/jest-dom';

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => {
        const data = [
          { SE_Practice: 'Practice 1', SE_Claim: ['Claim A', 'Claim B'] },
          { SE_Practice: 'Practice 2', SE_Claim: ['Claim C'] },
        ];
        console.log('Mocked fetch response:', data); // Log the mock response
        return Promise.resolve(data);
      },
    })
  ) as jest.Mock;
  
  describe('SEPractices Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
       
      });
  
    it('renders practices and claims correctly', async () => {
      render(<SEPractices />);

      screen.debug();
  
      // Wait for the component to fetch and render data
      await waitFor(() => {
        expect(screen.getByText('SPEED')).toBeInTheDocument();
        expect(screen.getByText('A searchable database of evidence about different claims regarding various SE practices.')).toBeInTheDocument();
      });
  
      // Check that the practices are rendered in the select box
      const practiceSelect = screen.getByRole('combobox', { name: /select a practice/i }) as HTMLSelectElement; // Cast to HTMLSelectElement
  
      // Ensure the dropdown is present
      expect(practiceSelect).toBeInTheDocument();
  
      // Check that the options are present
      expect(screen.getByText('Please Select a practice')).toBeInTheDocument(); 
      await waitFor(() => {
        expect(screen.getByText('Practice 1')).toBeInTheDocument(); // Check for Practice 1
        expect(screen.getByText('Practice 2')).toBeInTheDocument(); // Check for Practice 2
    });
      
      // Simulate selecting a practice
      fireEvent.change(practiceSelect, { target: { value: 'Practice 1' } });
      expect(practiceSelect.value).toBe('Practice 1');
    });
  });