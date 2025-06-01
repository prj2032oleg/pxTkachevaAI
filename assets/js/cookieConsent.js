document.addEventListener('alpine:init', () => {
  // Globaler Store für Cookie-Einstellungen
  Alpine.store('cookieConsent', {
    showBanner: true,
    cookiesAccepted: false,
    cookiesRejected: false,
    showDetails: false,
    essentialCookies: true,
    statisticsCookies: false,
    marketingCookies: false,
    externalMediaCookies: false,
    
    // Methoden
    init() {
      // Cookie-Entscheidung prüfen
      const cookieDecision = this.getCookie('cookie-consent');
      if (cookieDecision) {
        this.showBanner = false;
        const settings = JSON.parse(cookieDecision);
        this.cookiesAccepted = settings.accepted;
        this.cookiesRejected = settings.rejected;
        this.statisticsCookies = settings.statistics || false;
        this.marketingCookies = settings.marketing || false;
        this.externalMediaCookies = settings.externalMedia || false;
        this.lang = 'de'; // Standard-Sprache
      }
      // Einstellungen anwenden
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
      
      // Einstellungen anwenden
      this.applySettings();
    },
    
    enableSpecificCookie(cookieType) {
      if (cookieType === 'statistics') {
        this.statisticsCookies = true;
      } else if (cookieType === 'marketing') {
        this.marketingCookies = true;
      } else if (cookieType === 'externalMedia') {
        this.externalMediaCookies = true;
      }
      
      this.savePreferences(true, false);
    },
    
    // Hilfsfunktionen
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
    
    applySettings() {
      console.log('Cookie-Einstellungen angewendet:', {
        essential: this.essentialCookies,
        statistics: this.statisticsCookies,
        marketing: this.marketingCookies,
        externalMedia: this.externalMediaCookies
      });
      
      // Anwendungslogik hier...
      // (Die ursprünglichen Funktionen können hier eingefügt werden)
    }
  });
  
  // Initialisierung
  Alpine.start();
  Alpine.store('cookieConsent').init();
});