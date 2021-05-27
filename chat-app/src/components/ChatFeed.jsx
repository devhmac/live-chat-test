import MessageForm from "./MessageForm";
import Message from "./Message";
import IncomingMessage from "./IncomingMessage";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  console.log(messages);

  const renderMessages = () => {
    const keys = Object.keys(messages);
    console.log("keys", keys);
    return keys.map((key, index) => {
      const message = messages[key];

      //if there are messages, find the last one
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? <Message /> : <IncomingMessage />}
          </div>
        </div>
      );
    });
  };

  renderMessages();

  return <div>ChatFeed</div>;
};

export default ChatFeed;
