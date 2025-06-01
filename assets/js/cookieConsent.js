// Einfache Vanilla-JavaScript-Lösung für den Cookie-Banner
document.addEventListener('DOMContentLoaded', function() {
  // Cookie-Funktionen
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax';
  }
  
  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }
  
  // Cookie-Banner-Element erstellen
  function createCookieBanner() {
    const bannerHtml = `
      <div id="cookie-banner" class="fixed bottom-0 inset-x-0 z-50 bg-gray-900 text-white p-6 shadow-lg">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col space-y-6">
            <div class="flex flex-col">
              <h2 class="text-2xl font-bold mb-3">Cookie-Einstellungen</h2>
              <p class="text-base mb-3">Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern. Sie können entscheiden, welche Cookies Sie zulassen möchten.</p>
              <button id="toggle-details" class="text-blue-300 hover:underline text-base self-start">Details anzeigen</button>
            </div>
            
            <div id="cookie-details" class="w-full hidden">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-800 p-4 rounded">
                  <div class="flex items-center justify-between mb-3">
                    <label class="font-semibold text-base">Notwendige Cookies</label>
                    <div class="relative">
                      <input type="checkbox" checked disabled class="sr-only">
                      <div class="w-12 h-6 bg-gray-400 rounded-full shadow-inner"></div>
                      <div class="absolute w-8 h-8 bg-green-500 rounded-full shadow -left-1 -top-1 transition"></div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-300">Diese Cookies sind für das Funktionieren der Website erforderlich und können nicht deaktiviert werden.</p>
                </div>
                
                <div class="bg-gray-800 p-4 rounded">
                  <div class="flex items-center justify-between mb-3">
                    <label class="font-semibold text-base" for="statistics-cookies">Statistik-Cookies</label>
                    <div class="relative">
                      <input type="checkbox" id="statistics-cookies" class="sr-only" role="switch">
                      <div class="w-12 h-6 bg-gray-400 rounded-full shadow-inner"></div>
                      <div id="statistics-switch" class="absolute w-8 h-8 bg-red-500 rounded-full shadow -left-1 -top-1 transition"></div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-300">Diese Cookies sammeln Informationen, wie Sie unsere Website nutzen.</p>
                </div>
                
                <div class="bg-gray-800 p-4 rounded">
                  <div class="flex items-center justify-between mb-3">
                    <label class="font-semibold text-base" for="marketing-cookies">Marketing-Cookies</label>
                    <div class="relative">
                      <input type="checkbox" id="marketing-cookies" class="sr-only" role="switch">
                      <div class="w-12 h-6 bg-gray-400 rounded-full shadow-inner"></div>
                      <div id="marketing-switch" class="absolute w-8 h-8 bg-red-500 rounded-full shadow -left-1 -top-1 transition"></div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-300">Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten.</p>
                </div>
                
                <div class="bg-gray-800 p-4 rounded">
                  <div class="flex items-center justify-between mb-3">
                    <label class="font-semibold text-base" for="external-media-cookies">Externe Medien</label>
                    <div class="relative">
                      <input type="checkbox" id="external-media-cookies" class="sr-only" role="switch">
                      <div class="w-12 h-6 bg-gray-400 rounded-full shadow-inner"></div>
                      <div id="external-media-switch" class="absolute w-8 h-8 bg-red-500 rounded-full shadow -left-1 -top-1 transition"></div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-300">Externe Medien (z.B. Videos) können Cookies setzen, wenn sie eingebettet werden.</p>
                </div>
              </div>
            </div>
            
            <div class="flex flex-wrap justify-end gap-4 mt-2">
              <button id="reject-all" class="bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded text-base font-medium transition">
                Alle ablehnen
              </button>
              <button id="save-preferences" class="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded text-base font-medium transition">
                Auswahl speichern
              </button>
              <button id="accept-all" class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded text-base font-medium transition">
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div id="cookie-settings-button" class="fixed bottom-4 right-4 z-50 hidden">
        <button class="bg-gray-800 hover:bg-gray-700 text-white py-3 px-5 rounded-full flex items-center shadow-lg">
          <i class="fas fa-cookie-bite mr-2" aria-hidden="true"></i>
          Cookie-Einstellungen
        </button>
      </div>
    `;
    
    // Banner zur Seite hinzufügen
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = bannerHtml;
    while (tempDiv.firstChild) {
      document.body.appendChild(tempDiv.firstChild);
    }
  }
  
  // Cookie-Banner erstellen
  createCookieBanner();
  
  // Cookie-Zustände
  let cookieState = {
    statistics: false,
    marketing: false,
    externalMedia: false
  };
  
  // Cookie-Zustand aus gespeichertem Cookie laden
  const savedCookie = getCookie('cookie-consent');
  if (savedCookie) {
    try {
      const settings = JSON.parse(savedCookie);
      cookieState.statistics = settings.statistics || false;
      cookieState.marketing = settings.marketing || false;
      cookieState.externalMedia = settings.externalMedia || false;
      
      // Cookie-Banner ausblenden
      document.getElementById('cookie-banner').style.display = 'none';
      document.getElementById('cookie-settings-button').style.display = 'block';
    } catch (e) {
      console.error('Fehler beim Parsen der Cookie-Einstellungen:', e);
    }
  }
  
  // UI-Zustand aktualisieren
  function updateUIState() {
    // Statistik-Switch
    const statisticsSwitch = document.getElementById('statistics-switch');
    statisticsSwitch.className = cookieState.statistics 
      ? 'absolute w-8 h-8 bg-green-500 rounded-full shadow -left-1 -top-1 transition translate-x-6'
      : 'absolute w-8 h-8 bg-red-500 rounded-full shadow -left-1 -top-1 transition';
    
    // Marketing-Switch
    const marketingSwitch = document.getElementById('marketing-switch');
    marketingSwitch.className = cookieState.marketing 
      ? 'absolute w-8 h-8 bg-green-500 rounded-full shadow -left-1 -top-1 transition translate-x-6'
      : 'absolute w-8 h-8 bg-red-500 rounded-full shadow -left-1 -top-1 transition';
    
    // Externe Medien-Switch
    const externalMediaSwitch = document.getElementById('external-media-switch');
    externalMediaSwitch.className = cookieState.externalMedia 
      ? 'absolute w-8 h-8 bg-green-500 rounded-full shadow -left-1 -top-1 transition translate-x-6'
      : 'absolute w-8 h-8 bg-red-500 rounded-full shadow -left-1 -top-1 transition';
  }
  
  // Alle Cookies akzeptieren
  function acceptAllCookies() {
    cookieState.statistics = true;
    cookieState.marketing = true;
    cookieState.externalMedia = true;
    savePreferences();
  }
  
  // Alle Cookies ablehnen
  function rejectAllCookies() {
    cookieState.statistics = false;
    cookieState.marketing = false;
    cookieState.externalMedia = false;
    savePreferences();
  }
  
  // Einstellungen speichern
  function savePreferences() {
    const cookieSettings = {
      essential: true,
      statistics: cookieState.statistics,
      marketing: cookieState.marketing,
      externalMedia: cookieState.externalMedia,
      date: new Date().toISOString()
    };
    
    // Cookie für 6 Monate setzen
    setCookie('cookie-consent', JSON.stringify(cookieSettings), 180);
    
    // Banner ausblenden, Einstellungs-Button anzeigen
    document.getElementById('cookie-banner').style.display = 'none';
    document.getElementById('cookie-settings-button').style.display = 'block';
    
    // Einstellungen anwenden
    applySettings();
  }
  
  // Einstellungen anwenden
  function applySettings() {
    console.log('Cookie-Einstellungen angewendet:', cookieState);
    
    // Hier können die Einstellungen für verschiedene Cookie-Typen angewendet werden
    // z.B. Google Analytics laden, externe Medien aktivieren, etc.
  }
  
  // Cookie-Banner anzeigen
  function showCookieBanner() {
    document.getElementById('cookie-banner').style.display = 'block';
    document.getElementById('cookie-settings-button').style.display = 'none';
  }
  
  // Event-Listener
  document.getElementById('toggle-details').addEventListener('click', function() {
    const details = document.getElementById('cookie-details');
    const button = document.getElementById('toggle-details');
    if (details.classList.contains('hidden')) {
      details.classList.remove('hidden');
      button.textContent = 'Details ausblenden';
    } else {
      details.classList.add('hidden');
      button.textContent = 'Details anzeigen';
    }
  });
  
  document.getElementById('statistics-cookies').addEventListener('change', function() {
    cookieState.statistics = this.checked;
    updateUIState();
  });
  
  document.getElementById('marketing-cookies').addEventListener('change', function() {
    cookieState.marketing = this.checked;
    updateUIState();
  });
  
  document.getElementById('external-media-cookies').addEventListener('change', function() {
    cookieState.externalMedia = this.checked;
    updateUIState();
  });
  
  document.getElementById('accept-all').addEventListener('click', acceptAllCookies);
  document.getElementById('reject-all').addEventListener('click', rejectAllCookies);
  document.getElementById('save-preferences').addEventListener('click', savePreferences);
  document.getElementById('cookie-settings-button').addEventListener('click', showCookieBanner);
  
  // UI-Zustand initial aktualisieren
  updateUIState();
});
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