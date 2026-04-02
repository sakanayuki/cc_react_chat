interface Props {
  sender: 'player' | 'clover';
  text: string;
}

export function ChatMessage({ sender, text }: Props) {
  return (
    <div className={`chat-message chat-message--${sender}`}>
      <span className="chat-sender">{sender === 'player' ? 'あなた' : 'クローバー'}</span>
      <div className="chat-bubble">{text}</div>
    </div>
  );
}
