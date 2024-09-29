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
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <p>ID: {article._id}</p>
              <p>Authors: {article.authors}</p>
              <p>Published Date: {new Date(article.published_date).toLocaleDateString()}</p>
              <p>Source: {article.source}</p>
              <p>DOI: {article.DOI}</p>
              <p>Status: {article.status}</p>
              <p>Submitted Date: {new Date(article.submitted_date).toLocaleDateString()}</p>
              <p>Update Date: {new Date(article.update_date).toLocaleDateString()}</p>
              <p>Evidence Level: {article.Evidence_Level}</p>
              <br/>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
}