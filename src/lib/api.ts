// API client utilities for the SustainIndia platform

const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : '/api';

class APIClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // User Management
  async getUser(userId?: string) {
    return this.request(`/user${userId ? `?userId=${userId}` : ''}`);
  }

  async updateUser(userData: any) {
    return this.request('/user', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // EcoMeter
  async calculateCarbonFootprint(data: any) {
    return this.request('/eco-meter', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCarbonHistory(days: number = 7) {
    return this.request(`/eco-meter?days=${days}`);
  }

  // KrishiAI
  async getCropRecommendations(crop: string, region: string) {
    return this.request(`/krishi-ai?crop=${crop}&region=${region}`);
  }

  async generateAIRecommendations(data: any) {
    return this.request('/krishi-ai', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Missions
  async getDailyMissions(userId?: string) {
    return this.request(`/missions${userId ? `?userId=${userId}` : ''}`);
  }

  async completeMission(userId: string, missionId: string) {
    return this.request('/missions', {
      method: 'POST',
      body: JSON.stringify({ userId, missionId, action: 'complete' }),
    });
  }

  // Challenges
  async getChallenges() {
    return this.request('/challenges');
  }

  async joinChallenge(challengeId: string) {
    return this.request('/challenges', {
      method: 'PUT',
      body: JSON.stringify({ challengeId, action: 'join' }),
    });
  }

  async updateChallengeProgress(challengeId: string, progress: number) {
    return this.request('/challenges', {
      method: 'POST',
      body: JSON.stringify({ challengeId, progress }),
    });
  }

  // Leaderboard
  async getLeaderboard(type: string = 'states', sortBy: string = 'ecoPoints') {
    return this.request(`/leaderboard?type=${type}&sortBy=${sortBy}`);
  }

  async updateLeaderboard(stateCode: string, points: number) {
    return this.request('/leaderboard', {
      method: 'POST',
      body: JSON.stringify({ stateCode, points }),
    });
  }

  // Rewards
  async getBadges(userId?: string) {
    return this.request(`/rewards?type=badges${userId ? `&userId=${userId}` : ''}`);
  }

  async getPerks(userId?: string) {
    return this.request(`/rewards?type=perks${userId ? `&userId=${userId}` : ''}`);
  }

  async redeemPerk(userId: string, perkId: string, pointsCost: number) {
    return this.request('/rewards', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        action: 'redeemPerk',
        itemId: perkId,
        pointsCost,
      }),
    });
  }

  async unlockBadge(userId: string, badgeId: string) {
    return this.request('/rewards', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        action: 'unlockBadge',
        itemId: badgeId,
      }),
    });
  }

  async addEcoPoints(userId: string, points: number) {
    return this.request('/rewards', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        action: 'addEcoPoints',
        pointsCost: points,
      }),
    });
  }

  // Analytics
  async getNationalAnalytics(timeframe: string = '30days') {
    return this.request(`/analytics?type=national&timeframe=${timeframe}`);
  }

  async getUserAnalytics(userId: string) {
    return this.request(`/analytics?type=user&userId=${userId}`);
  }

  async getStateAnalytics(timeframe: string = '30days') {
    return this.request(`/analytics?type=states&timeframe=${timeframe}`);
  }

  // Notifications
  async getNotifications(userId?: string, type?: string, limit?: number) {
    let url = '/notifications';
    const params = new URLSearchParams();
    
    if (userId) params.append('userId', userId);
    if (type) params.append('type', type);
    if (limit) params.append('limit', limit.toString());
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    return this.request(url);
  }

  async markNotificationAsRead(userId: string, notificationId?: string) {
    return this.request('/notifications', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        action: 'markAsRead',
        notificationId,
      }),
    });
  }

  async deleteNotification(userId: string, notificationId?: string) {
    return this.request('/notifications', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        action: 'delete',
        notificationId,
      }),
    });
  }

  async createNotification(userId: string, notification: any) {
    return this.request('/notifications', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        action: 'create',
        ...notification,
      }),
    });
  }

  async sendAITip(userId: string) {
    return this.request('/notifications', {
      method: 'PUT',
      body: JSON.stringify({ userId }),
    });
  }
}

// Export singleton instance
export const apiClient = new APIClient();

// Helper functions for common operations
export const sustainIndiaAPI = {
  // Quick access methods
  async updateUserEcoPoints(userId: string, points: number) {
    try {
      await apiClient.addEcoPoints(userId, points);
      await apiClient.updateLeaderboard('MH', points); // Assuming Maharashtra for demo
    } catch (error) {
      console.error('Failed to update EcoPoints:', error);
    }
  },

  async logActivity(userId: string, activity: string, points: number) {
    try {
      await apiClient.addEcoPoints(userId, points);
      await apiClient.createNotification(userId, {
        type: 'activity',
        title: 'Activity Logged!',
        message: `You earned ${points} EcoPoints for ${activity}`,
        icon: '🌱',
        priority: 'normal'
      });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  },

  async checkForBadgeUnlock(userId: string, activityType: string) {
    try {
      // This would contain logic to check if user qualifies for any badges
      // Based on their recent activities and achievements
      const badges = await apiClient.getBadges(userId);
      // Badge unlock logic would go here
    } catch (error) {
      console.error('Failed to check badge unlock:', error);
    }
  }
};

export default apiClient;
