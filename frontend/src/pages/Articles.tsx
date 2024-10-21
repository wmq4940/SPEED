import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Article {
  _id: string;  
  title: string;
  authors: string;
  published_date: Date;
  source: string;
  DOI: string;
  status: string;
  submitted_date: Date;
  update_date: Date;
  SE_Practice: string;
  SE_Claim: string;
  Evidence_Level: string;
}

export default function Articles() {
  const router = useRouter();
  const { practice, claim } = router.query;

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (practice && claim) {
        try {
          const response = await fetch(`https://backend-pi-flax-88.vercel.app/api/articles?sepractice=${practice}&seclaim=${claim}`);
          const data = await response.json();
          const analyzedArticles = data.filter((article: Article) => article.status === 'analysed');  
          setArticles(analyzedArticles);
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      }
    };

    fetchArticles();
  }, [practice, claim]);

  const handleViewClick = (article: Article) => {
    router.push(`/ArticleDetails?id=${article._id}`);
  };

  return (
    <div className='articles_Wrapper' style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: '#2c3e50', fontSize: '2em' }}>
        Articles for {practice} - {claim}
      </h1>
      <br />
      {articles.length > 0 ? (
        <table style={{ margin: '0 auto', width: '95%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#FFD700'}}>Title</th>
              <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#FFD700'}}>Authors</th>
              <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#FFD700'}}>Published Date</th>
              <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#FFD700'}}>Source</th>
              <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#FFD700'}}>DOI</th>
              <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#FFD700'}}>Status</th>
              <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#FFD700'}}>Submitted Date</th>
              <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#FFD700'}}>Update Date</th>
              <th style={{ border: '3px solid #ddd', padding: '8px', backgroundColor: '#FFD700'}}>Evidence Level</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr
                key={index}
                onClick={() => handleViewClick(article)}
                style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '')}
              >
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>{article.title}</td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>{article.authors}</td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>{new Date(article.published_date).toLocaleDateString()}</td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>{article.source}</td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>{article.DOI}</td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>{article.status}</td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>{new Date(article.submitted_date).toLocaleDateString()}</td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>{new Date(article.update_date).toLocaleDateString()}</td>
                <td style={{ border: '3px solid #ddd', padding: '8px' }}>{article.Evidence_Level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No articles found.</p>
      )}
      <Link href="/List">
        <button
          className="button"
          style={{
            margin: '20px',
            padding: '10px 20px',
            fontSize: '1em',
            backgroundColor: '#FFD700',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Go back to List
        </button>
      </Link>
    </div>
  );
}
