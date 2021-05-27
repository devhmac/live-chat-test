const Message = ({ lastMessage, message }) => {
  const userFirstMessage =
    !lastMessage || lastMessage.sender.username !== message.sender.username;

  return (
    <div className="message-row">
      {/* if first message want avatar */}
      {userFirstMessage && (
        <div
          className="message-avatar"
          style={{ backgroundImage: `url(${message?.sender?.avatar})` }}
        />
      )}
      {/* if its image render image, else render message */}
      {message?.attachments?.length > 0} ? (
      <img
        src={message.attachments[0].filename}
        alt="message-attachment"
        className="message-image"
        style={{ marginleft: userFirstMessage ? "4px" : "48px" }}
      />
      ) : (
      <div
        className="message"
        style={{
          float: "left",
          color: "white",
          marginleft: userFirstMessage ? "4px" : "48px",
          backgroundColor: "#CABCDC",
        }}
      >
        {message.text}
      </div>
      )
    </div>
  );
};

export default Message;
