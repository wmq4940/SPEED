import { useEffect, useState } from 'react';
import Navbar from './navbar/Navbar';

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
  Detail: string;
}

export default function SubmittedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsInput, setDetailsInput] = useState<string>('');

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/articles');
      const data = await response.json();

      // Filter articles with 'submitted' status and sort by 'submitted_date'
      const submittedArticles = data
        .filter((article: Article) => article.status === 'moderated')
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

  const handleEnterDetails = async () => {
    if (!selectedArticle) return; // Guard clause

    try {
      await fetch(`http://localhost:8000/api/articles/${selectedArticle._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...selectedArticle, Detail: detailsInput, status: 'analysed' }),
      });
      // Refresh the articles after approval
      handleCloseModal();
      fetchArticles(); // Re-fetch the articles
    } catch (error) {
      console.error('Error updating article details:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div style={{ padding: '50px' }}>
          {articles.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 5 }}>
              <h1 style={{ fontWeight: 'bold', fontSize: '2.0em', margin: '8px' }}>Moderated Articles</h1>
              {articles.map((article, index) => (
                <li 
                  key={index} 
                  style={articleContainerStyle} 
                  onClick={() => window.open(`${article.DOI}`)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.1em', padding: '10', fontWeight: 'bold', marginRight: '10px', justifyContent: 'center' }}>
                      {article.DOI}
                    </h2>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheck(article);
                      }} 
                      className="button" 
                      style={buttonStyle}
                    >
                      Enter Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No moderated articles found.</p>
          )}
        </div>

        {isModalOpen && selectedArticle && (
            <div className="modal" style={modalOverlayStyle}>
                <div className="modal-content" style={modalContentStyle}>
                <span className="close-button" onClick={handleCloseModal}>&times;</span>
                <h1 style={{ fontSize: '1.8em' }}>
                    <b>
                    <a 
                        href={`${selectedArticle.DOI}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: '#007bff', textDecoration: 'none' }}
                    >
                        {selectedArticle.DOI}
                    </a>
                    </b>
                </h1>

              <div style={{ marginTop: '20px' }}>
                <label style={{ fontWeight: 'bold' }}>Details:</label>
                <textarea 
                  onChange={(e) => setDetailsInput(e.target.value)} // Update input on change
                  rows={4}
                  style={{
                    height: '400px',
                    padding: '10px',
                    width: '100%',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                  required
                />
              </div>

              <div style={{ marginTop: '20px' }}>
                <button onClick={handleEnterDetails} className="button" style={submitButtonStyle}>Submit</button>
              </div>
            </div>
          </div>
        
      )}
    </div>
    </>
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
  fontSize: '1.1em',
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '15px',
  width: '90%',
  maxWidth: '1000px',
  textAlign: 'left' as 'left',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

// Styles for the article container
const articleContainerStyle = {
  padding: '10px',
  marginBottom: '10px',
  backgroundColor: '#fff',
  border: '1px solid #e0e0e0',
  borderRadius: '15px',
  transition: 'background-color 0.3s ease',
  cursor: 'pointer',
};

// Button styles
const buttonStyle = {
  padding: '6px 15px',
  marginTop: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  fontSize: '0.9em',
  fontWeight: 'bold',
};

const submitButtonStyle = {
  padding: '6px 20px',
  marginTop: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  fontSize: '1.0em',
  fontWeight: 'bold',
  marginRight: '15px',
};

// Adding hover effect
const styles = {
  articleContainer: {
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
};

