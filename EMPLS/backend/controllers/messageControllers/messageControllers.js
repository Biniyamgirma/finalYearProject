const db = require("../../database/createDataBase");

const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;

        // Insert the new message into the database
        const result = db.prepare(`
            INSERT INTO messages (senderId, receiverId, message)
            VALUES (?, ?, ?)
        `).run(senderId, receiverId, message);

        res.status(201).json({ message: "Message sent successfully", messageId: result.lastInsertRowid });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        // Delete the message from the database
        const result = db.prepare(`
            DELETE FROM messages WHERE messageId = ?
        `).run(messageId);

        // Check if the delete was successful
        if (result.changes === 0) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
// Get messages between two police officers
// Get messages between two police stations
const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    db.all(
      `SELECT 
        m.messageId,
        m.message,
        m.sent_at,
        sender.policeStationId as senderId,
        sender.policeStationName as senderName,
        sender.policeStationLogo as senderLogo,
        receiver.policeStationId as receiverId,
        receiver.policeStationName as receiverName,
        receiver.policeStationLogo as receiverLogo
       FROM messages m
       JOIN policeStation sender ON m.sendersId = sender.policeStationId
       JOIN policeStation receiver ON m.receiversId = receiver.policeStationId
       WHERE (m.sendersId = ? AND m.receiversId = ?)
       OR (m.sendersId = ? AND m.receiversId = ?)
       ORDER BY m.sent_at ASC`,
      [senderId, receiverId, receiverId, senderId],
      (err, rows) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ 
            success: false,
            error: 'Failed to retrieve messages',
            details: err.message 
          });
        }
        
        // Format the response
        const formattedMessages = rows.map(row => ({
          messageId: row.messageId,
          content: row.message,
          sentAt: row.sent_at,
          senderStation: {
            id: row.senderId,
            name: row.senderName,
            logo: row.senderLogo
          },
          receiverStation: {
            id: row.receiverId,
            name: row.receiverName,
            logo: row.receiverLogo
          }
        }));
        
        res.json({
          success: true,
          data: formattedMessages,
          count: formattedMessages.length
        });
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ 
      success: false,
      error: 'An unexpected error occurred',
      details: error.message 
    });
  }
};

module.exports = {
    sendMessage,
    deleteMessage,
    getMessages
}