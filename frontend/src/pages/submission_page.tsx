import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Article {
  _id: string;
  title: string;
  authors: string;
  published_date: string;
  source: string;
  DOI: string;
  status: string;
  SE_Practice: string;
  SE_Claim: string;
  Evidence_Level: string;
  submitted_date: string;
  update_date: string;
}

export default function ArticleDetails() {
  const router = useRouter();
  const { id } = router.query; 

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const response = await fetch(`https://backend-pi-flax-88.vercel.app/api/articles/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch article');
          }
          const data: Article = await response.json();
          setArticle(data);
        } catch (error) {
          setError('Error fetching article');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div style={styles.container}>
      {loading ? (
        <h2 style={styles.loading}>Loading...</h2>
      ) : error ? (
        <>
          <h2 style={styles.error}>{error}</h2>
          <p style={styles.errorMessage}>There was an issue loading the article. Please try again later.</p>
        </>
      ) : article ? (
        <div style={styles.articleContainer}>
          <h1 style={styles.title}>{article.title}</h1>
          <p style={styles.meta}>Authors: {article.authors}</p>
          <p style={styles.meta}>Published Date: {new Date(article.published_date).toLocaleDateString()}</p>
          <p style={styles.meta}>Source: {article.source}</p>
          <p style={styles.meta}>DOI: <a href={article.DOI} target="_blank" style={styles.link}>{article.DOI}</a></p>
          <p style={styles.meta}>Status: {article.status}</p>
          <p style={styles.meta}>SE Practice: {article.SE_Practice}</p>
          <p style={styles.meta}>SE Claim: {article.SE_Claim}</p>
          <p style={styles.meta}>Evidence Level: {article.Evidence_Level}</p>
          <p style={styles.meta}>Submitted Date: {new Date(article.submitted_date).toLocaleDateString()}</p>
          <p style={styles.meta}>Last Updated: {new Date(article.update_date).toLocaleDateString()}</p>

          <div style={styles.buttonSection}>
            <button onClick={() => router.back()} style={styles.button}>Back to List</button>
          </div>
        </div>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    textAlign: 'center' as 'center',
  },
  articleContainer: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
    maxWidth: '800px',
    width: '100%',
    margin: '20px',
    textAlign: 'left' as 'left',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  meta: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '10px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  buttonSection: {
    marginTop: '30px',
    textAlign: 'center' as 'center',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  loading: {
    fontSize: '1.5rem',
    color: '#666',
  },
  error: {
    fontSize: '1.5rem',
    color: '#e74c3c',
  },
  errorMessage: {
    fontSize: '1.5rem',
    color: '#666',
  },
};
