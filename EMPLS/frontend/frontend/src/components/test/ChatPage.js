import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Form, Button, InputGroup } from 'react-bootstrap';

const ChatPage = ({ friends, messages, onSendMessage, currentUserId }) => {
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Automatically select the first friend by default if the list is available
  useEffect(() => {
    if (friends.length > 0 && selectedFriendId === null) {
      setSelectedFriendId(friends[0].id);
    }
  }, [friends, selectedFriendId]);

  const handleSelectFriend = (friendId) => {
    setSelectedFriendId(friendId);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '' && selectedFriendId) {
      onSendMessage(inputValue, selectedFriendId);
      setInputValue('');
    }
  };

  // Scroll to the latest message when messages or selected friend changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedFriendId]);

  const selectedMessages = selectedFriendId ? messages[selectedFriendId] || [] : [];

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Friends List Container */}
        <Col md={3} className="border-end h-100 overflow-auto">
          <ListGroup>
            {friends.map((friend) => (
              <ListGroup.Item
                key={friend.id}
                active={friend.id === selectedFriendId}
                onClick={() => handleSelectFriend(friend.id)}
                style={{ cursor: 'pointer' }}
              >
                {friend.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Chat Area Container */}
        <Col md={9} className="d-flex flex-column h-100">
          {selectedFriendId ? (
            <>
              <div className="flex-grow-1 overflow-auto">
                {selectedMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`d-flex ${message.sender === currentUserId ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    <div
                      style={{
                        padding: '10px',
                        margin: '5px',
                        borderRadius: '10px',
                        maxWidth: '70%',
                        backgroundColor: message.sender === currentUserId ? '#DCF8C6' : '#FFFFFF',
                        wordWrap: 'break-word',
                      }}
                    >
                      {message.text}
                      <div style={{ fontSize: '0.8em', color: '#888', textAlign: 'right' }}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type a message"
                  />
                  <Button variant="primary" onClick={handleSendMessage}>
                    Send
                  </Button>
                </InputGroup>
              </Form>
            </>
          ) : (
            <div className="text-center mt-5">
              <h4>Select a friend to start chatting</h4>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;