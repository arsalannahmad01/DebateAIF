// const API_URL = 'https://9daa-13-233-74-219.ngrok-free.app/api';
const API_URL = 'http://localhost:5001/api';


export const contactService = {
  async submitFeedback(feedbackData) {
    const response = await fetch(`${API_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit feedback');
    }

    return response.json();
  }
}; 