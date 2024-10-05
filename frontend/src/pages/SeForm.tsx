import { useState } from 'react';
import styles from './SeForm.module.css'; // Import the CSS module

export default function FormPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    sePracticeName: '',
    explanation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll just log the data to the console
    console.log(formData);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Submit a New SE Practice</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Contact Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Name of the SE Practice</label>
        <input
          type="text"
          name="sePracticeName"
          value={formData.sePracticeName}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Explain why this should be added</label>
        <textarea
          name="explanation"
          value={formData.explanation}
          onChange={handleChange}
          className={styles.textarea}
          required
        />

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
