// const API_URL = process.env.REACT_APP_API_URL || 'https://13.233.74.219:443/api';
const API_URL = 'http://localhost:5001/api';

export const debateService = {
  async initiateDebate(debateData) {
    const response = await fetch(`${API_URL}/debates/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        title: debateData.name,
        topic: debateData.topic.name,
        aiStance: debateData.aiStance,
        duration: Math.floor(debateData.totalDuration / 60), // Convert seconds to minutes
        difficulty: 'intermediate', // Default difficulty
        tags: [] // Optional tags array
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to initiate debate');
    }

    return response.body;
  },

  async getDebate(debateId) {
    const response = await fetch(`${API_URL}/debates/${debateId}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch debate');
    }

    return response.json();
  },

  async updateDebate(debateId, updateData) {
    const response = await fetch(`${API_URL}/debates/${debateId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update debate');
    }

    return response.json();
  },

  async getAIResponse(debateId, argument) {
    const response = await fetch(`${API_URL}/debates/${debateId}/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        content: argument.content,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get AI response');
    }

    return response.body;
  },

  async saveAIResponse(debateId, aiResponse) {
    const response = await fetch(`${API_URL}/debates/${debateId}/save-response`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        content: aiResponse,
        type: 'rebuttal',
        side: 'ai'
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save AI response');
    }

    return response.json();
  },

  async completeDebate(debateId) {
    const response = await fetch(`${API_URL}/debates/${debateId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to complete debate');
    }

    return response.json();
  },

  async getFeedback(debateId) {
    const response = await fetch(`${API_URL}/debates/${debateId}/feedback`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get feedback');
    }

    return response.json();
  },

  async getUserStats() {
    const response = await fetch(`${API_URL}/debates/stats`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get user stats');
    }

    return response.json();
  }
}; 