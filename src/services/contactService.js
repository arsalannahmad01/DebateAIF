const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL;

export const contactService = {
  async sendMessage(messageData) {
    try {
      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(messageData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }

      return response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}; 