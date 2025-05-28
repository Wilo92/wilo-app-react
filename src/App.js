import React, { useState, useEffect } from 'react';

const images = [
  "https://www.investcanada.ca/sites/default/files/styles/narrow_banner/public/2023-03/istock-1350722246.jpg?itok=TShp2t20",
  "https://usatech.mx/templates/articles/images/gridbg/background1.jpg",
  "https://www.ucp.edu.co/wp-content/uploads/2025/01/Logo_50_ucp-1.webp"
];

function App() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    alert('¡Personal Web site!');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      {/* Navbar */}
      <nav style={{
        width: '100%',
        backgroundColor: '#003366',
        color: 'white',
        padding: '10px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="https://www.ucp.edu.co/wp-content/uploads/2025/01/Logo_50_ucp-1.webp"
            alt="Logo UCP"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
            Catholic University of Pereira
          </span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>HOME</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>ABOUT US</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>CONTACT</a>
        </div>
      </nav>

      {/* Carrusel */}
      <div style={{
        marginTop: '70px',
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd'
      }}>
        <img
          src={images[currentImage]}
          alt="Carrusel UCP"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
      </div>

      {/* Contenido Principal */}
      <div style={{
        backgroundColor: '#f0f8ff',
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <h1>SPECIALIZATION IN SOFTWARE DEVELOPMENT</h1>
        <img
          src="https://www.ucp.edu.co/wp-content/uploads/2025/01/Logo_50_ucp-1.webp"
          alt="Logo Universidad Católica de Pereira"
          style={{ width: '200px', margin: '20px 0' }}
        />
        <h2>Presented by</h2>
        <p>Ing. Wilmer Restrepo (Wilo) & Ing. Henry Libreros</p>

        <h2>Presented to</h2>
        <p>Ing. Andres Mauricio Martinez</p>

        <button
          onClick={handleClick}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0056b3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px'
          }}
        >
          ¡Personal Web site!
        </button>
      </div>

      {/* Cards con efectos */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '40px 20px',
        backgroundColor: '#e6f0fa'
      }}>
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              width: '300px',
              padding: '20px',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
          >
            <img
              src="https://www.ucp.edu.co/wp-content/uploads/2025/01/Logo_50_ucp-1.webp"
              alt={`Card ${num}`}
              style={{ width: '100px', marginBottom: '15px' }}
            />
            <h3>Card Title {num}</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#003366',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <p>&copy; {new Date().getFullYear()} Catholic University of Pereira - Specialization in Software Development</p>
        <p>Contact: contact@ucp.edu.gov</p>
      </footer>
    </div>
  );
}

export default App;


