import MessageForm from "./MessageForm";
import Message from "./Message";
import IncomingMessage from "./IncomingMessage";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  console.log(userName);
  //if chat exists, and checks which chat you're actively looking at
  const chat = chats && chats[activeChat];

  const renderReadReciepts = (message, isMyMessage) => {
    //has person read the message
    return chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-reciept"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage: `url(${person?.person?.avatar})`,
            }}
          />
        )
    );
  };

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
            {isMyMessage ? (
              <Message message={message} />
            ) : (
              <IncomingMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            className="read-reciepts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReciepts(message, isMyMessage)}
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
      {renderMessages()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
