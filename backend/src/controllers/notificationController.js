const db = require('../config/db');

exports.getUserNotifications = (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = db.find('notifications', n => n.userId === userId);
    res.json(notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user notifications' });
  }
};

exports.markAsRead = (req, res) => {
  try {
    const { id } = req.params;
    db.update('notifications', n => n.id === id, { read: true });
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update notification' });
  }
};
