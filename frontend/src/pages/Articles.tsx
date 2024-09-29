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
}

export default function Articles() {
  const router = useRouter();
  const { practice, claim } = router.query;

  const [articles, setArticles] = useState<Article[]>([]);

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

  return (
    <div>
      <h1>Articles for {practice} - {claim}</h1>
      <br/>
      {articles.length > 0 ? (
        <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Published Date</th>
            <th>Source</th>
            <th>DOI</th>
            <th>Status</th>
            <th>Submitted Date</th>
            <th>Update Date</th>
            <th>Evidence Level</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index}>
              <td>{article.title}</td>
              <td>{article.authors}</td>
              <td>{new Date(article.published_date).toLocaleDateString()}</td>
              <td>{article.source}</td>
              <td>{article.DOI}</td>
              <td>{article.status}</td>
              <td>{new Date(article.submitted_date).toLocaleDateString()}</td>
              <td>{new Date(article.update_date).toLocaleDateString()}</td>
              <td>{article.Evidence_Level}</td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
}