document.addEventListener('alpine:init', () => {
  Alpine.data('teamSection', () => ({
    lang: 'de',
    showProfile: false,
    selectedMember: {},
    team: [
      // Пример для одного сотрудника, остальные аналогично
      {
        fullName: 'Tatiana Tkacheva',
        photo: 'team/TatianaTkacheva.png',
        position: 'Zahnärztin & Praxisinhaberin',
        clinic: 'Zahnarztpraxis Denzlingen',
        cv: 'vita/vita_tkacheva.pdf' // если есть, иначе null
      },
      {
        fullName: 'Dr. med. dent. Franziska Eisenmenger',
        photo: 'team/DrFranziskaEisenmenger.png',
        position: 'Zahnärztin',
        clinic: 'Zahnarztpraxis Denzlingen',
        cv: 'vita/vita_eisenmenger.pdf' // если есть, иначе null
      },
      {
        fullName: 'Dr. med. dent. Ute Klaffke',
        photo: 'team/DrUteKlaffke.png',
        position: 'Zahnärztin',
        clinic: 'Zahnarztpraxis Denzlingen',
        cv: 'vita/vita_Klaffke.pdf' // если есть, иначе null
      },
      {
        fullName: 'Dr. Tobias Eisenmenger',
        photo: 'team/man.png',
        position: 'Zahnärztin',
        clinic: 'Zahnarztpraxis Denzlingen',
        cv: null // если есть, иначе null
      },
      // ... остальные сотрудники
    ],
    openProfile(member) {
      this.selectedMember = member;
      this.showProfile = true;
    }
  }));
}); 