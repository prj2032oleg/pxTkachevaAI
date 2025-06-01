document.addEventListener('alpine:init', () => {
  // Globaler Store für die gemeinsame Nutzung des Zustands
  Alpine.store('cookieState', {
    showBanner: true,
    showDetails: false,
    statisticsCookies: false,
    marketingCookies: false,
    externalMediaCookies: false,
    
    // Store-Methoden
    init() {
      // Prüfen, ob bereits eine Cookie-Entscheidung getroffen wurde
      const cookieDecision = this.getCookie('cookie-consent');
      if (cookieDecision) {
        try {
          const settings = JSON.parse(cookieDecision);
          this.showBanner = false;
          this.statisticsCookies = settings.statistics || false;
          this.marketingCookies = settings.marketing || false;
          this.externalMediaCookies = settings.externalMedia || false;
          
          // Einstellungen anwenden
          if (this.statisticsCookies) this.loadGoogleAnalytics();
          if (this.marketingCookies) this.loadMarketingScripts();
          if (this.externalMediaCookies) this.enableExternalMedia();
        } catch (e) {
          console.error('Fehler beim Parsen der Cookie-Einstellungen:', e);
        }
      }
    },
    
    // Cookie Hilfsfunktionen
    setCookie(name, value, days) {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax';
    },
    
    getCookie(name) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
      return null;
    },
    
    deleteCookie(name) {
      document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    
    // Cookie-Aktionen
    acceptAll() {
      this.statisticsCookies = true;
      this.marketingCookies = true;
      this.externalMediaCookies = true;
      this.savePreferences();
    },
    
    rejectAll() {
      this.statisticsCookies = false;
      this.marketingCookies = false;
      this.externalMediaCookies = false;
      this.savePreferences();
    },
    
    savePreferences() {
      const cookieSettings = {
        essential: true,
        statistics: this.statisticsCookies,
        marketing: this.marketingCookies,
        externalMedia: this.externalMediaCookies,
        date: new Date().toISOString()
      };
      
      // Cookie für 6 Monate setzen
      this.setCookie('cookie-consent', JSON.stringify(cookieSettings), 180);
      this.showBanner = false;
      
      // Einstellungen anwenden
      if (this.statisticsCookies) {
        this.loadGoogleAnalytics();
      } else {
        this.unloadGoogleAnalytics();
      }
      
      if (this.marketingCookies) {
        this.loadMarketingScripts();
      } else {
        this.unloadMarketingScripts();
      }
      
      if (this.externalMediaCookies) {
        this.enableExternalMedia();
      } else {
        this.disableExternalMedia();
      }
      
      // Event-Trigger für andere Komponenten
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
        detail: {
          essential: true,
          statistics: this.statisticsCookies,
          marketing: this.marketingCookies,
          externalMedia: this.externalMediaCookies
        }
      }));
    },
    
    enableSpecificCookie(cookieType) {
      if (cookieType === 'statistics') {
        this.statisticsCookies = true;
      } else if (cookieType === 'marketing') {
        this.marketingCookies = true;
      } else if (cookieType === 'externalMedia') {
        this.externalMediaCookies = true;
      }
      
      this.savePreferences();
    },
    
    // Google Analytics laden
    loadGoogleAnalytics() {
      if (document.getElementById('ga-script')) return;
      
      const gaScript = document.createElement('script');
      gaScript.id = 'ga-script';
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
      document.head.appendChild(gaScript);
      
      const gaInitScript = document.createElement('script');
      gaInitScript.id = 'ga-init-script';
      gaInitScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
      `;
      document.head.appendChild(gaInitScript);
    },
    
    // Google Analytics deaktivieren
    unloadGoogleAnalytics() {
      const gaScript = document.getElementById('ga-script');
      const gaInitScript = document.getElementById('ga-init-script');
      
      if (gaScript) gaScript.remove();
      if (gaInitScript) gaInitScript.remove();
      
      // Google Analytics Cookies löschen
      this.deleteCookie('_ga');
      this.deleteCookie('_gat');
      this.deleteCookie('_gid');
      
      // Alle Google Analytics Cookies mit Präfix _ga löschen
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf('_ga') === 0) {
          const cookieName = cookie.split('=')[0];
          this.deleteCookie(cookieName);
        }
      }
      
      if (window.dataLayer) {
        window.dataLayer = [];
      }
    },
    
    // Marketing-Skripte laden
    loadMarketingScripts() {
      if (document.getElementById('fb-pixel')) return;
      
      const fbPixelScript = document.createElement('script');
      fbPixelScript.id = 'fb-pixel';
      fbPixelScript.innerHTML = `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'XXXXXXXXXX');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbPixelScript);
    },
    
    // Marketing-Skripte deaktivieren
    unloadMarketingScripts() {
      const fbPixelScript = document.getElementById('fb-pixel');
      if (fbPixelScript) fbPixelScript.remove();
      
      // Facebook Pixel Cookies löschen
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf('_fbp') === 0 || cookie.indexOf('_fbc') === 0) {
          const cookieName = cookie.split('=')[0];
          this.deleteCookie(cookieName);
        }
      }
      
      if (window.fbq) {
        window.fbq = undefined;
      }
    },
    
    // Externe Medien aktivieren
    enableExternalMedia() {
      document.querySelectorAll('.external-media-placeholder').forEach(placeholder => {
        const mediaType = placeholder.dataset.type;
        const mediaSrc = placeholder.dataset.src;
        const mediaTitle = placeholder.dataset.title || (mediaType === 'youtube' ? 'YouTube Video' : 'Google Maps');
        
        if (mediaType === 'youtube') {
          placeholder.innerHTML = `<iframe 
                                      src="${mediaSrc}" 
                                      title="${mediaTitle}"
                                      style="border: none;"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowfullscreen>
                                  </iframe>`;
        } else if (mediaType === 'google-maps') {
          placeholder.innerHTML = `<iframe 
                                      src="${mediaSrc}" 
                                      title="${mediaTitle}"
                                      style="border: none;"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowfullscreen>
                                  </iframe>`;
        }
        
        placeholder.classList.remove('external-media-placeholder');
      });
    },
    
    // Externe Medien deaktivieren
    disableExternalMedia() {
      const lang = document.documentElement.lang || 'de';
      
      document.querySelectorAll('iframe').forEach(iframe => {
        const src = iframe.src;
        const title = iframe.title || '';
        
        if (src.includes('youtube.com') || src.includes('youtu.be')) {
          const placeholder = document.createElement('div');
          placeholder.className = 'external-media-placeholder';
          placeholder.dataset.type = 'youtube';
          placeholder.dataset.src = src;
          placeholder.dataset.title = title;
          
          const loadButtonId = `load-youtube-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          
          placeholder.innerHTML = `
            <div class="p-4 bg-gray-200 rounded text-center">
              <p id="${loadButtonId}-text">${lang === 'de' ? 'YouTube-Video (erfordert Cookies für externe Medien)' : 'Видео YouTube (требует файлов cookie для внешних медиа)'}</p>
              <button id="${loadButtonId}" 
                     class="mt-2 px-4 py-2 bg-blue-600 text-white rounded" 
                     onclick="Alpine.store('cookieState').enableSpecificCookie('externalMedia')"
                     aria-labelledby="${loadButtonId}-text"
                     role="button">
                ${lang === 'de' ? 'Video laden' : 'Загрузить видео'}
              </button>
            </div>
          `;
          iframe.parentNode.replaceChild(placeholder, iframe);
        } else if (src.includes('google.com/maps')) {
          const placeholder = document.createElement('div');
          placeholder.className = 'external-media-placeholder';
          placeholder.dataset.type = 'google-maps';
          placeholder.dataset.src = src;
          placeholder.dataset.title = title;
          
          const loadButtonId = `load-maps-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          
          placeholder.innerHTML = `
            <div class="p-4 bg-gray-200 rounded text-center">
              <p id="${loadButtonId}-text">${lang === 'de' ? 'Google Maps (erfordert Cookies für externe Medien)' : 'Карты Google (требует файлов cookie для внешних медиа)'}</p>
              <button id="${loadButtonId}" 
                     class="mt-2 px-4 py-2 bg-blue-600 text-white rounded" 
                     onclick="Alpine.store('cookieState').enableSpecificCookie('externalMedia')"
                     aria-labelledby="${loadButtonId}-text"
                     role="button">
                ${lang === 'de' ? 'Karte laden' : 'Загрузить карту'}
              </button>
            </div>
          `;
          iframe.parentNode.replaceChild(placeholder, iframe);
        }
      });
    }
  });
  
  // Komponente für lokale Funktionalität (nur für UI-Zustand)
  Alpine.data('cookieConsent', () => ({
    get showBanner() {
      return Alpine.store('cookieState').showBanner;
    },
    showDetails: false,
    
    toggleDetails() {
      this.showDetails = !this.showDetails;
    }
  }));
  
  // Initialisierung des Stores
  Alpine.store('cookieState').init();
});