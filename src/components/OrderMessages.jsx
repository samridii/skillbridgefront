import { useState, useEffect, useRef } from 'react';
import { getMessages, sendMessage } from '../api/messagesApi';
import { useAuth } from '../context/AuthContext';

const OrderMessages = ({ orderId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const { user } = useAuth();
  const bottomRef = useRef(null);

  const loadMessages = async () => {
    try {
      const res = await getMessages(orderId);
      setMessages(res.data);
    } catch (err) {
      setError('Failed to load messages');
    }
  };

  useEffect(() => {
    loadMessages();
  }, [orderId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    setError('');
    try {
      await sendMessage(orderId, text);
      setText('');
      loadMessages(); // refetch, keeps ordering and ids consistent with the real backend record
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <h3 style={{ marginTop: 0 }}>Messages</h3>
      <div style={{ maxHeight: '260px', overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {messages.length === 0 && <p style={{ fontSize: '0.85rem' }}>No messages yet, say hello.</p>}
        {messages.map((m) => {
          const isMine = m.sender === user?._id;
          return (
            <div
              key={m._id}
              style={{
                alignSelf: isMine ? 'flex-end' : 'flex-start',
                background: isMine ? 'var(--blue)' : 'var(--glass)',
                border: isMine ? 'none' : '1px solid var(--glass-border)',
                borderRadius: '10px',
                padding: '0.5em 0.8em',
                maxWidth: '75%',
                fontSize: '0.85rem',
              }}
            >
              {m.content}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." maxLength={2000} />
        <button type="submit" disabled={sending} style={{ flexShrink: 0 }}>Send</button>
      </form>
    </div>
  );
};

export default OrderMessages;