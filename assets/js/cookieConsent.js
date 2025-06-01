document.addEventListener('alpine:init', () => {
  Alpine.data('cookieConsent', () => ({
    showBanner: true,
    cookiesAccepted: false,
    cookiesRejected: false,
    showDetails: false,
    essentialCookies: true, // Immer aktiviert
    statisticsCookies: false,
    marketingCookies: false,
    externalMediaCookies: false,
    
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
      // Hier würde die Logik zur Aktivierung der entsprechenden Skripte folgen
      // z.B. Google Analytics nur laden, wenn statisticsCookies = true
      console.log('Cookie-Einstellungen angewendet:', {
        essential: this.essentialCookies,
        statistics: this.statisticsCookies,
        marketing: this.marketingCookies,
        externalMedia: this.externalMediaCookies
      });
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
    }
  }));
});
