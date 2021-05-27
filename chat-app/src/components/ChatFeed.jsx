import MessageForm from "./MessageForm";
import Message from "./Message";
import IncomingMessage from "./IncomingMessage";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  console.log(chats);
  //if chat exists, and checks which chat you're actively looking at
  const chat = chats && chats[activeChat];

  const renderMessages = () => {
    const keys = Object.keys(messages);
    return keys.map((key, index) => {
      const message = messages[key];

      //if there are messages, find the last one
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      // check if username = username of sender
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? <Message /> : <IncomingMessage />}
          </div>
          <div
            className="read-reciepts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            read-reciepts
          </div>
        </div>
      );
    });
  };

  if (!chat) return "Loading....";

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat.title}</div>
        <div className="chat-subtitle">
          {/* makes subtitle a string of all usernames in the chat */}
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
