document.addEventListener('alpine:init', () => {
  // Store für globalen Zugriff auf Cookie-Einstellungen
  Alpine.store('cookieConsent', {
    enableSpecificCookie(cookieType) {
      const component = document.querySelector('[x-data="cookieConsent"]').__x.$data;
      if (component) {
        component.enableSpecificCookie(cookieType);
      }
    }
  });

  Alpine.data('cookieConsent', () => ({
    showBanner: true,
    cookiesAccepted: false,
    cookiesRejected: false,
    showDetails: false,
    essentialCookies: true, // Immer aktiviert
    statisticsCookies: false,
    marketingCookies: false,
    externalMediaCookies: false,
    lang: 'de', // Standard-Sprache
    
    init() {
      // Prüfen, ob bereits eine Cookie-Entscheidung getroffen wurde
      const cookieDecision = this.getCookie('cookie-consent');
      if (cookieDecision) {
        this.showBanner = false;
        const settings = JSON.parse(cookieDecision);
        this.cookiesAccepted = settings.accepted;
        this.cookiesRejected = settings.rejected;
        this.statisticsCookies = settings.statistics || false;
        this.marketingCookies = settings.marketing || false;
        this.externalMediaCookies = settings.externalMedia || false;
      }
      
      // Synchronisiere lang-Wert mit dem globalen Alpine-Zustand
      this.$watch('$root.lang', (value) => {
        this.lang = value;
      });
      
      // Initialisiere mit der aktuellen Sprache
      if (typeof this.$root.lang !== 'undefined') {
        this.lang = this.$root.lang;
      }
      
      // Anwenden der gespeicherten Einstellungen bei der Initialisierung
      this.applySettings();
    },
    
    acceptAll() {
      this.statisticsCookies = true;
      this.marketingCookies = true;
      this.externalMediaCookies = true;
      this.savePreferences(true, false);
    },
    
    rejectAll() {
      this.statisticsCookies = false;
      this.marketingCookies = false;
      this.externalMediaCookies = false;
      this.savePreferences(false, true);
    },
    
    savePreferences(accepted, rejected) {
      const cookieSettings = {
        accepted: accepted,
        rejected: rejected,
        essential: this.essentialCookies,
        statistics: this.statisticsCookies,
        marketing: this.marketingCookies,
        externalMedia: this.externalMediaCookies,
        date: new Date().toISOString()
      };
      
      // Cookie für 6 Monate setzen
      this.setCookie('cookie-consent', JSON.stringify(cookieSettings), 180);
      this.showBanner = false;
      this.cookiesAccepted = accepted;
      this.cookiesRejected = rejected;
      
      // Hier könnten Tracking-Skripte basierend auf den Einstellungen aktiviert werden
      this.applySettings();
    },
    
    resetSettings() {
      this.deleteCookie('cookie-consent');
      this.showBanner = true;
      this.cookiesAccepted = false;
      this.cookiesRejected = false;
      this.statisticsCookies = false;
      this.marketingCookies = false;
      this.externalMediaCookies = false;
      this.showDetails = false;
    },
    
    applySettings() {
      console.log('Cookie-Einstellungen angewendet:', {
        essential: this.essentialCookies,
        statistics: this.statisticsCookies,
        marketing: this.marketingCookies,
        externalMedia: this.externalMediaCookies
      });
    
      // Statistik-Cookies (z.B. Google Analytics)
      if (this.statisticsCookies) {
        this.loadGoogleAnalytics();
      } else {
        this.unloadGoogleAnalytics();
      }
    
      // Marketing-Cookies (z.B. Facebook Pixel)
      if (this.marketingCookies) {
        this.loadMarketingScripts();
      } else {
        this.unloadMarketingScripts();
      }
    
      // Externe Medien (z.B. YouTube, Maps)
      if (this.externalMediaCookies) {
        this.enableExternalMedia();
      } else {
        this.disableExternalMedia();
      }
    
      // Event-Trigger für andere Komponenten
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
        detail: {
          essential: this.essentialCookies,
          statistics: this.statisticsCookies,
          marketing: this.marketingCookies,
          externalMedia: this.externalMediaCookies
        }
      }));
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
    
    // Google Analytics laden
    loadGoogleAnalytics() {
      if (document.getElementById('ga-script')) return;
    
      // Google-Analytics-Skript-Tag erstellen
      const gaScript = document.createElement('script');
      gaScript.id = 'ga-script';
      gaScript.async = true;
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // ID durch Ihre Google Analytics ID ersetzen
      document.head.appendChild(gaScript);
    
      // Google Analytics Initialisierungscode
      const gaInitScript = document.createElement('script');
      gaInitScript.id = 'ga-init-script';
      gaInitScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX'); // ID durch Ihre Google Analytics ID ersetzen
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
    
      // DataLayer zurücksetzen
      if (window.dataLayer) {
        window.dataLayer = [];
      }
    },
    
    // Marketing-Skripte laden (z.B. Facebook Pixel)
    loadMarketingScripts() {
      if (document.getElementById('fb-pixel')) return;
    
      // Facebook Pixel-Skript-Tag erstellen
      const fbPixelScript = document.createElement('script');
      fbPixelScript.id = 'fb-pixel';
      fbPixelScript.innerHTML = `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'XXXXXXXXXX'); // ID durch Ihre Facebook Pixel ID ersetzen
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
    
      // Facebook Pixel Objekt zurücksetzen
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
      document.querySelectorAll('iframe').forEach(iframe => {
        const src = iframe.src;
        const title = iframe.title || '';
        
        if (src.includes('youtube.com') || src.includes('youtu.be')) {
          const placeholder = document.createElement('div');
          placeholder.className = 'external-media-placeholder';
          placeholder.dataset.type = 'youtube';
          placeholder.dataset.src = src;
          placeholder.dataset.title = title;
          placeholder.setAttribute('role', 'region');
          placeholder.setAttribute('aria-label', this.lang === 'de' ? 'YouTube-Video Platzhalter' : 'Плейсхолдер видео YouTube');
          
          const loadButtonId = `load-youtube-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          
          placeholder.innerHTML = `
            <div class="p-4 bg-gray-200 rounded text-center">
              <p id="${loadButtonId}-text">${this.lang === 'de' ? 'YouTube-Video (erfordert Cookies für externe Medien)' : 'Видео YouTube (требует файлов cookie для внешних медиа)'}</p>
              <button id="${loadButtonId}" 
                     class="mt-2 px-4 py-2 bg-blue-600 text-white rounded" 
                     onclick="Alpine.store('cookieConsent').enableSpecificCookie('externalMedia')"
                     aria-labelledby="${loadButtonId}-text"
                     role="button">
                ${this.lang === 'de' ? 'Video laden' : 'Загрузить видео'}
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
          placeholder.setAttribute('role', 'region');
          placeholder.setAttribute('aria-label', this.lang === 'de' ? 'Google Maps Platzhalter' : 'Плейсхолдер карты Google');
          
          const loadButtonId = `load-maps-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          
          placeholder.innerHTML = `
            <div class="p-4 bg-gray-200 rounded text-center">
              <p id="${loadButtonId}-text">${this.lang === 'de' ? 'Google Maps (erfordert Cookies für externe Medien)' : 'Карты Google (требует файлов cookie для внешних медиа)'}</p>
              <button id="${loadButtonId}" 
                     class="mt-2 px-4 py-2 bg-blue-600 text-white rounded" 
                     onclick="Alpine.store('cookieConsent').enableSpecificCookie('externalMedia')"
                     aria-labelledby="${loadButtonId}-text"
                     role="button">
                ${this.lang === 'de' ? 'Karte laden' : 'Загрузить карту'}
              </button>
            </div>
          `;
          iframe.parentNode.replaceChild(placeholder, iframe);
        }
      });
    },
    
    // Spezifische Cookie-Kategorie aktivieren
    enableSpecificCookie(cookieType) {
      if (cookieType === 'statistics') {
        this.statisticsCookies = true;
      } else if (cookieType === 'marketing') {
        this.marketingCookies = true;
      } else if (cookieType === 'externalMedia') {
        this.externalMediaCookies = true;
      }
      
      this.savePreferences(this.cookiesAccepted, false);
    }
  }));
});