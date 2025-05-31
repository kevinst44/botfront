import { useEffect, useState } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('botback-q73g.vercel.app/api/chat/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data);
      } catch (err) {
        console.error('Error obteniendo historial', err);
      }
    };

    fetchHistory();
  }, []);

const handleReset = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/chat/reset', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    alert(data.message);
    setMessages([]); // limpia el historial en el frontend también
  } catch (err) {
    console.error('Error al reiniciar historial:', err);
    alert('No se pudo reiniciar la conversación');
  }
};


  const sendMessage = async e => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { sender: 'user', message: input };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const res = await axios.post(
        'http://localhost:5000/api/chat/send',
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botResponse = { sender: 'bot', message: res.data.message };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      console.error('Error enviando mensaje', err);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Asesor Financiero JK</h2>
      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '1rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender === 'user' ? 'Tú' : 'jk'}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <button onClick={handleReset} style={{ margin: '1rem', padding: '0.5rem 1rem' }}>
  Borrar chat
</button>

      <form onSubmit={sendMessage} style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{ width: '80%' }}
        />
        <button type="submit" style={{ width: '18%', marginLeft: '2%' }}>
          Enviar
        </button>
      </form>
        <button
  onClick={async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/chat/export',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
    } catch (err) {
      alert('Error enviando historial');
    }
  }}
  style={{ marginBottom: '1rem' }}
>
  Enviar historial al correo
</button>
<button>
    <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        Cerrar sesión
    </a>
    
</button>

    </div>
  );
}


export default Chat;
