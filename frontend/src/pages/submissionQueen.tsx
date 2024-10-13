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
    <> <Navbar />
    <div>
      <div style={{ 
        position: 'absolute', 
        top: '120px', 
        right: '20px', 
        maxHeight: '70vh', 
        overflowY: 'auto', 
        width: '450px', 
        border: '1px solid #ccc', 
        borderRadius: '15px', 
        padding: '10px', 
        backgroundColor: '#f9f9f9' 
      }}>
        {articles.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 5 }}>
            <h1 style={{ fontWeight: 'bold', fontSize: '2.0em', margin: '8px' }}>Submitted Articles</h1>
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
  <h1 style={{ fontSize: '1.8em' }}><b>{selectedArticle.title}</b></h1>
  
  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
    <tbody>
      <tr>
        <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ddd' }}>Authors:</td>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{selectedArticle.authors}</td>
      </tr>
      <tr>
        <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ddd' }}>Published Date:</td>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{new Date(selectedArticle.published_date).toLocaleDateString()}</td>
      </tr>
      <tr>
        <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ddd' }}>Source:</td>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{selectedArticle.source}</td>
      </tr>
      <tr>
        <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ddd' }}>DOI:</td>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{selectedArticle.DOI}</td>
      </tr>
      <tr>
        <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ddd' }}>Status:</td>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{selectedArticle.status}</td>
      </tr>
      <tr>
        <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ddd' }}>Submitted Date:</td>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{new Date(selectedArticle.submitted_date).toLocaleDateString()}</td>
      </tr>
      <tr>
        <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ddd' }}>Update Date:</td>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{new Date(selectedArticle.update_date).toLocaleDateString()}</td>
      </tr>
      <tr>
        <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ddd' }}>SE Practice:</td>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{selectedArticle.SE_Practice}</td>
      </tr>
      <tr>
        <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ddd' }}>SE Claim:</td>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{selectedArticle.SE_Claim}</td>
      </tr>
      <tr>
        <td style={{ fontWeight: 'bold', padding: '8px', borderBottom: '1px solid #ddd' }}>Evidence Level:</td>
        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{selectedArticle.Evidence_Level}</td>
      </tr>
    </tbody>
  </table>

  <div style={{ marginTop: '20px' }}>
    <button onClick={handleDeny} className="button" style={denyButtonStyle}>Deny</button> 
    <button onClick={handleApprove} className="button" style={approveButtonStyle}>Approve</button>
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

const approveButtonStyle = {
  padding: '6px 20px',
  marginTop: '10px',
  backgroundColor: 'green',
  color: '#fff',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  fontSize: '1.0em',
  fontWeight: 'bold',
};

const denyButtonStyle = {
 padding: '6px 32px',
  marginTop: '10px',
  backgroundColor: 'red',
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
