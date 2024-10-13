import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [choice, setChoice] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const moderatePassword = process.env.NEXT_PUBLIC_MODERATE_PASSWORD;
    const analysePassword = process.env.NEXT_PUBLIC_ANALYSE_PASSWORD;

    if (choice === 'submit') {
      router.push('/SeForm');
    } else if (choice === 'moderate') {
      if (password === moderatePassword) {
        router.push('/List');
      } else {
        setErrorMessage('Incorrect password for moderation.');
      }
    } else if (choice === 'analyse') {
      if (password === analysePassword) {
        router.push('/List');
      } else {
        setErrorMessage('Incorrect password for analysis.');
      }
    } else {
      setErrorMessage('Please choose an option.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6">Login to SPEED Database</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label className="mb-4">
          Choose an action:
          <select
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
            className="ml-2 p-2 border"
          >
            <option value="">Select</option>
            <option value="submit">Submit</option>
            <option value="moderate">Moderate</option>
            <option value="analyse">Analyze</option>
          </select>
        </label>

        {(choice === 'moderate' || choice === 'analyse') && (
          <label className="mb-4">
            Enter Password:
            <input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-2 p-2 border"
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="show-password">Show Password</label>
            </div>
          </label>
        )}

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Proceed
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
