import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useGame } from '../../store/GameContext';
import { matchChat } from './chatScript';
import { ChatMessage } from './ChatMessage';
import './ChatPanel.css';

interface Message {
  id: number;
  sender: 'player' | 'clover';
  text: string;
}

const INITIAL_MESSAGE: Message = {
  id: 0,
  sender: 'clover',
  text: 'ねえ… なにか言って。 *そわそわ*',
};

export function ChatPanel() {
  const { dispatch } = useGame();
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const playerMsg: Message = { id: idRef.current++, sender: 'player', text: trimmed };
    setMessages((prev) => [...prev, playerMsg]);
    setInput('');

    const { response, buff } = matchChat(trimmed);

    if (buff) {
      dispatch({ type: 'APPLY_BUFF', buff });
    }

    setTimeout(() => {
      const cloverMsg: Message = { id: idRef.current++, sender: 'clover', text: response };
      setMessages((prev) => [...prev, cloverMsg]);
    }, 400);
  };

  return (
    <aside className="chat-panel">
      <div className="chat-panel-title">CHAT</div>
      <div className="chat-messages">
        {messages.map((m) => (
          <ChatMessage key={m.id} sender={m.sender} text={m.text} />
        ))}
        <div ref={bottomRef} />
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="話しかける..."
          maxLength={100}
        />
        <button className="chat-send-btn" type="submit">
          &#x25B6;
        </button>
      </form>
    </aside>
  );
}
