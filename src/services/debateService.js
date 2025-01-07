const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL;

export const debateService = {
  async initiateDebate(debateData) {
    try {
      const response = await fetch(`${API_URL}/debates/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: debateData.title,
          topic: debateData.topic,
          aiStance: debateData.aiStance,
          duration: Math.floor(debateData.totalDuration / 60),
          turnDuration: Math.floor(debateData.turnDuration / 60),
          difficulty: 'intermediate',
          tags: []
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to initiate debate');
      }

      // Return just the stream reader
      return {
        stream: response.body ? response.body.getReader() : null
      };
    } catch (error) {
      console.error('Error initiating debate:', error);
      throw error;
    }
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
    try {
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

      // Return the reader from the response body
      return response.body ? response.body.getReader() : null;
    } catch (error) {
      console.error('Error getting AI response:', error);
      throw error;
    }
  },

  async saveAIResponse(debateId, content) {
    const response = await fetch(`${API_URL}/debates/${debateId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        aiArgument: {
          content,
          type: 'rebuttal'
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save AI response');
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
  },

  async getRecentDebates() {
    const response = await fetch(`${API_URL}/debates/recent`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch recent debates');
    }

    return response.json();
  },

  async getStats() {
    const response = await fetch(`${API_URL}/debates/stats`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch stats');
    }

    return response.json();
  },

  async saveUserArgument(debateId, content) {
    const response = await fetch(`${API_URL}/debates/${debateId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        userArgument: {
          content,
          type: 'rebuttal'
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save user argument');
    }

    return response.json();
  },

  async getDebateScores(debateId) {
    try {
      const response = await fetch(`${API_URL}/debates/${debateId}/scores`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to get debate scores');
      }

      return response.json();
    } catch (error) {
      console.error('Error getting debate scores:', error);
      throw error;
    }
  },

  async updateDebateScores(debateId, scoreData) {
    try {
      const response = await fetch(`${API_URL}/debates/${debateId}/scores`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(scoreData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update debate scores');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating debate scores:', error);
      throw error;
    }
  }
}; 