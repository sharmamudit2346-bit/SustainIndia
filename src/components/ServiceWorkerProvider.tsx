'use client';

import { useEffect } from 'react';

export function ServiceWorkerProvider() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Check for app install prompt
    let deferredPrompt: any;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install prompt after 30 seconds
      setTimeout(() => {
        if (deferredPrompt) {
          showInstallPrompt(deferredPrompt);
        }
      }, 30000);
    });

    // Handle app install
    function showInstallPrompt(prompt: any) {
      const installBanner = document.createElement('div');
      installBanner.innerHTML = `
        <div style="
          position: fixed;
          bottom: 20px;
          left: 20px;
          right: 20px;
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          color: white;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          animation: slideUp 0.5s ease-out;
        ">
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">Install SustainIndia</div>
            <div style="font-size: 14px; opacity: 0.9;">Add to home screen for easy access</div>
          </div>
          <div>
            <button id="install-yes" style="
              background: white;
              color: #22c55e;
              border: none;
              padding: 8px 16px;
              border-radius: 8px;
              font-weight: 600;
              margin-right: 8px;
              cursor: pointer;
            ">Install</button>
            <button id="install-no" style="
              background: transparent;
              color: white;
              border: 1px solid rgba(255,255,255,0.3);
              padding: 8px 16px;
              border-radius: 8px;
              cursor: pointer;
            ">Later</button>
          </div>
        </div>
        <style>
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        </style>
      `;

      document.body.appendChild(installBanner);

      // Handle install button click
      document.getElementById('install-yes')?.addEventListener('click', () => {
        prompt.prompt();
        prompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          }
          deferredPrompt = null;
          document.body.removeChild(installBanner);
        });
      });

      // Handle later button click
      document.getElementById('install-no')?.addEventListener('click', () => {
        document.body.removeChild(installBanner);
      });

      // Auto hide after 10 seconds
      setTimeout(() => {
        if (document.body.contains(installBanner)) {
          document.body.removeChild(installBanner);
        }
      }, 10000);
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification('SustainIndia Notifications Enabled!', {
              body: 'You\'ll receive daily eco-tips and mission reminders.',
              icon: '/icon-192x192.png'
            });
          }
        });
      }, 5000);
    }

    // Send daily notification
    if ('Notification' in window && Notification.permission === 'granted') {
      const sendDailyTip = () => {
        const tips = [
          'Did you know? A single tree absorbs 48 pounds of CO₂ per year! 🌳',
          'Switch to LED bulbs and save up to 80% on lighting energy! 💡',
          'Taking 5-minute showers can save 25 gallons of water! 💧',
          'Using public transport reduces your carbon footprint by 45%! 🚌',
          'Recycling one aluminum can powers a TV for 3 hours! ♻️'
        ];
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        
        new Notification('Daily Eco Tip from SustainIndia', {
          body: randomTip,
          icon: '/icon-192x192.png',
          badge: '/badge-72x72.png'
        });
      };

      // Send notification every 24 hours (for demo, every 30 seconds)
      setInterval(sendDailyTip, 30000);
    }
  }, []);

  return null;
}
