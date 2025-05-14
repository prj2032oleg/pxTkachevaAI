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
      {
        fullName: 'Samanta Heuser',
        photo: 'team/Samanta%20Heuser_1.png',
        position: 'Prophylaxe, QM-Beauftragte',
        clinic: 'Zahnarztpraxis Denzlingen',
        cv: null // если есть, иначе null
      },
      {
        fullName: 'Florida Nuraj',
        photo: 'team/FloraNuraj.png',
        position: 'Praxismanagerin & Abrechnung',
        clinic: 'Zahnarztpraxis Denzlingen',
        cv: null // если есть, иначе null
      },  
      {
        fullName: 'Alfira Simani',
        photo: 'team/AlfiraSimani.png',
        position: 'Rezeption',
        clinic: 'Zahnarztpraxis Denzlingen',
        cv: null // если есть, иначе null
      }, 
      {
        fullName: 'Ramona Lais',
        photo: 'team/RamonaLais.png',
        position: 'Verwaltung, Prophylaxe, Stuhlassistenz',
        clinic: 'Zahnarztpraxis Tkacheva Freiburg',
        cv: null // если есть, иначе null
      },    
      {
        fullName: 'Hamda Abdirahman',
        photo: 'team/HamdaAbdirahman.png',
        position: 'Auszubildende',
        clinic: 'Zahnarztpraxis Tkacheva Freiburg',
        cv: null // если есть, иначе null
      },     
      {
        fullName: 'Christina Schmieder',
        photo: 'team/ChristinaSchmieder.png',
        position: 'Auszubildende',
        clinic: 'Zahnarztpraxis Tkacheva Freiburg',
        cv: null // если есть, иначе null
      },   
      {
        fullName: 'Ninmar Malki',
        photo: 'team/NinmarMalki.png',
        position: 'Vorbereitungsassistent',
        clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
        cv: null // если есть, иначе null
      },  
      {
        fullName: 'Sandra Schillinger',
        photo: 'team/SandraSchillinger.png',
        position: 'Praxismanagerin, Prophylaxe',
        clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
        cv: null // если есть, иначе null
      },       
      {
        fullName: 'Renate Weidinger',
        photo: 'team/RenateWeidinger.png',
        position: 'Verwaltung',
        clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
        cv: null // если есть, иначе null
      },   
      {
        fullName: 'Maria Kreiler',
        photo: 'team/MariaKreiler.png',
        position: 'Stuhlassistenz',
        clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
        cv: null // если есть, иначе null
      },    
      {
        fullName: 'Sofia Somai',
        photo: 'team/SofiaSomai.png',
        position: 'Auszubildende',
        clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
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