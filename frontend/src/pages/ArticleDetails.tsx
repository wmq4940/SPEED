import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Article {
  title: string;
  Detail: string;
}

export default function ArticleDetails() {
  const router = useRouter();
  const { id } = router.query; 

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const response = await fetch(`https://backend-pi-flax-88.vercel.app/api/articles/${id}`);
          const data = await response.json();
          setArticle(data);
        } catch (error) {
          console.error('Error fetching article:', error);
        }
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div className="Detail-page">
    {article ? (
      <>
        <section className="Detail-section">
          <h2>{article.title}</h2>
          <p><strong>Details:</strong> {article.Detail}</p>
        </section>
        <div className="Button-section">
          <button onClick={() => router.back()} className="button">Back to List</button>
        </div>
      </>
    ) : (
      <p>No articles found.</p>
    )}
  </div>
);
}