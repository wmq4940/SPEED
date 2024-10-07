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

export default function SubmittedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/articles');
      const data = await response.json();

      // Filter articles with 'submitted' status and sort by 'submitted_date'
      const submittedArticles = data
        .filter((article: Article) => article.status === 'submitted')
        .sort(
          (a: Article, b: Article) =>
            new Date(a.submitted_date).getTime() - new Date(b.submitted_date).getTime()
        );

      setArticles(submittedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchArticles(); // Fetch articles on component mount
  }, []);

  const handleCheck = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleApprove = async () => {
    if (!selectedArticle) return; // Guard clause

    try {
      await fetch(`http://localhost:8000/api/articles/${selectedArticle._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...selectedArticle, status: 'moderated' }),
      });
      // Refresh the articles after approval
      handleCloseModal();
      // Re-fetch the articles if needed
      fetchArticles();
    } catch (error) {
      console.error('Error updating article status:', error);
    }
  };

  const handleDeny = async () => {
    if (!selectedArticle) return; // Guard clause

    try {
      await fetch(`http://localhost:8000/api/articles/${selectedArticle._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...selectedArticle, status: 'denied' }),
      });
      // Refresh the articles after denial
      handleCloseModal();
      // Re-fetch the articles if needed
      fetchArticles();
    } catch (error) {
      console.error('Error updating article status:', error);
    }
  };

  return (
    <div>
      <h1 style={{ fontWeight: 'bold' }}>Submitted Articles</h1>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <h2>Title: {article.title}</h2>
              <p>Authors: {article.authors}</p>
              <p>Submitted Date: {new Date(article.submitted_date).toLocaleDateString()}</p>
              <button onClick={() => handleCheck(article)} className='button'>Check</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No submitted articles found.</p>
      )}

      {isModalOpen && selectedArticle && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h1>{selectedArticle.title}</h1>
            <p>Authors: {selectedArticle.authors}</p>
            <p>Published Date: {new Date(selectedArticle.published_date).toLocaleDateString()}</p>
            <p>Source: {selectedArticle.source}</p>
            <p>DOI: {selectedArticle.DOI}</p>
            <p>Status: {selectedArticle.status}</p>
            <p>Submitted Date: {new Date(selectedArticle.submitted_date).toLocaleDateString()}</p>
            <p>Update Date: {new Date(selectedArticle.update_date).toLocaleDateString()}</p>
            <p>SE Practice: {selectedArticle.SE_Practice}</p>
            <p>SE Claim: {selectedArticle.SE_Claim}</p>
            <p>Evidence Level: {selectedArticle.Evidence_Level}</p>

            <div>
                <button onClick={handleApprove} className="button">Approve</button>
                <br/>
                <button onClick={handleDeny} className="button">Deny</button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}
