import { useState } from 'react';
import styles from './SeForm.module.css'; // Assuming the styles already exist

export default function ArticleForm() {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    published_date: '',
    source: '',
    DOI: '',
    status: 'submitted', // Set the initial status to 'submitted' for moderation
    submitted_date: new Date().toISOString().split('T')[0], // Automatically set the current date
    update_date: '',
    SE_Practice: '',
    SE_Claim: '',
    Evidence_Level: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if SE_Practice or SE_Claim is new, and if so, update the database
      const seResponse = await fetch('https://backend-pi-flax-88.vercel.app/api/se', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          SE_Practice: formData.SE_Practice,
          SE_Claim: [formData.SE_Claim]
        })
      });

      if (!seResponse.ok) {
        throw new Error('Failed to update SE information');
      }

      // Submit the article data with status 'submitted'
      const articleResponse = await fetch('https://backend-pi-flax-88.vercel.app/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!articleResponse.ok) {
        throw new Error('Failed to submit article');
      }

      alert('Article submitted successfully and is awaiting moderation.');
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting the article.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Submit a New Article</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Input fields for article details */}
        <label className={styles.label}>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Authors</label>
        <input
          type="text"
          name="authors"
          value={formData.authors}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Published Date</label>
        <input
          type="date"
          name="published_date"
          value={formData.published_date}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Source</label>
        <input
          type="text"
          name="source"
          value={formData.source}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>DOI</label>
        <input
          type="text"
          name="DOI"
          value={formData.DOI}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>SE Practice</label>
        <input
          type="text"
          name="SE_Practice"
          value={formData.SE_Practice}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>SE Claim</label>
        <input
          type="text"
          name="SE_Claim"
          value={formData.SE_Claim}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Evidence Level</label>
        <input
          type="text"
          name="Evidence_Level"
          value={formData.Evidence_Level}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
