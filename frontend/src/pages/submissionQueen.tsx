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
      fetchArticles(); // Re-fetch the articles
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
      fetchArticles(); // Re-fetch the articles
    } catch (error) {
      console.error('Error updating article status:', error);
    }
  };

  return (
    <div style={{ position: 'relative', padding: '20px', fontSize: '1em' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Submitted Articles</h1>
      <div style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          maxHeight: '70vh', 
          overflowY: 'auto', 
          width: '450px', 
          border: '1px solid #ccc', 
          borderRadius: '5px', 
          padding: '10px', 
          backgroundColor: '#f9f9f9' 
        }}>
        {articles.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {articles.map((article, index) => (
              <li key={index} style={articleContainerStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '1.1em', padding: '10', fontWeight: 'bold', marginRight: '10px', justifyContent: 'center'}}>{article.title}</h2>
                  <button onClick={() => handleCheck(article)} className='button' style={buttonStyle}>Check</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No submitted articles found.</p>
        )}
      </div>

      {isModalOpen && selectedArticle && (
        <div className="modal" style={modalOverlayStyle}>
          <div className="modal-content" style={modalContentStyle}>
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
              <button onClick={handleApprove} className="button" style={approveButtonStyle}>Approve</button>
              <br />
              <button onClick={handleDeny} className="button" style={denyButtonStyle}>Deny</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles for the modal overlay
const modalOverlayStyle = {
  position: 'fixed' as 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

// Styles for the modal content
const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  width: '80%',
  maxWidth: '600px',
  textAlign: 'left' as 'left',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

// Styles for the article container
const articleContainerStyle = {
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: '#fff',
  border: '1px solid #e0e0e0',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
  cursor: 'pointer',
};

// Button styles
const buttonStyle = {
  padding: '6px 10px',
  marginTop: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '0.8em',
};

const approveButtonStyle = {
  padding: '8px 15px',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
  fontSize: '0.9em',
};

const denyButtonStyle = {
  padding: '8px 15px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '0.9em',
};

// Adding hover effect
const styles = {
  articleContainer: {
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
};
