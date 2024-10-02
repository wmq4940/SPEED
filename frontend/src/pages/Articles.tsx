import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
  Details: string;
}

export default function Articles() {
  const router = useRouter();
  const { practice, claim } = router.query;

  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null); // State for selected article

  useEffect(() => {
    const fetchArticles = async () => {
      if (practice && claim) {
        try {
          const response = await fetch(`http://localhost:8000/api/articles?sepractice=${practice}&seclaim=${claim}`);
          const data = await response.json();
          setArticles(data);
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      }
    };

    fetchArticles();
  }, [practice, claim]);

  const handleViewClick = (article: Article) => {
    setSelectedArticle(article); // Set the selected article to display details
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
              <th style={{ border: '3px solid #ddd', padding: '8px' ,backgroundColor: '#FFD700'}}>Title</th>
              <th style={{ border: '3px solid #ddd', padding: '8px' ,backgroundColor: '#FFD700'}}>Authors</th>
              <th style={{ border: '3px solid #ddd', padding: '8px' ,backgroundColor: '#FFD700'}}>Published Date</th>
              <th style={{ border: '3px solid #ddd', padding: '8px' ,backgroundColor: '#FFD700'}}>Source</th>
              <th style={{ border: '3px solid #ddd', padding: '8px' ,backgroundColor: '#FFD700'}}>DOI</th>
              <th style={{ border: '3px solid #ddd', padding: '8px' ,backgroundColor: '#FFD700'}}>Status</th>
              <th style={{ border: '3px solid #ddd', padding: '8px' ,backgroundColor: '#FFD700'}}>Submitted Date</th>
              <th style={{ border: '3px solid #ddd', padding: '8px' ,backgroundColor: '#FFD700'}}>Update Date</th>
              <th style={{ border: '3px solid #ddd', padding: '8px' ,backgroundColor: '#FFD700'}}>Evidence Level</th>

            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={index}>
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
      <a href="http://localhost:3000/List">
        <button className="button" style={{ margin: '20px', padding: '10px 20px', fontSize: '1em', backgroundColor: '#FFD700', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Go back to List
        </button>
      </a>
    </div>
      ) : (   
        <div>
          <div className="Detail-page">
          <section className="Detail-section">
          <h2>{selectedArticle.title}</h2>
          <p><strong>Details:</strong> {selectedArticle.Details}</p>
          </section>
          <div className="Button-section">
        <button onClick={() => setSelectedArticle(null)} className="button">Back to List</button>
      </div>
        </div></div>
      )}
    </div>
  );
}
