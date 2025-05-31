import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Bienvenido al Chatbot</h1>
      <p>Por favor, inicia sesión o regístrate para continuar.</p>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/login">
          <button style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
            Iniciar Sesión
          </button>
        </Link>
        <Link to="/register">
          <button style={{ padding: '0.5rem 1rem' }}>
            Registrarse
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
