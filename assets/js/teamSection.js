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
        fullName: 'Dr. Franziska Eisenmenger',
        photo: 'team/DrFranziskaEisenmenger.png',
        position: 'Zahnärztin',
        clinic: 'Zahnarztpraxis Denzlingen',
        cv: 'vita/vita_eisenmenger.pdf' // если есть, иначе null
      },
      {
        fullName: 'Dr. Ute Klaffke',
        photo: 'team/DrUteKlaffke.png',
        position: 'Zahnärztin',
        clinic: 'Zahnarztpraxis Denzlingen',
        cv: 'vita/vita_Klaffke.pdf' // если есть, иначе null
      },
      {
        fullName: 'Dr. Tobias Eisenmenger',
        photo: 'team/man.png',
        position: 'Zahnarzt',
        clinic: 'Zahnarztpraxis Denzlingen',
        cv: null // если есть, иначе null
      },
      {
        fullName: 'Ninmar Malki',
        photo: 'team/NinmarMalki.png',
        position: 'Zahnarzt',
        clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
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
        position: 'Zahnmedizinische Fachangestellte',
        clinic: 'Zahnarztpraxis Tkacheva Freiburg',
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
            photo: 'team/mariaKreiler.png',
            position: 'Zahnmedizinische Fachangestellte',
            clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
            cv: null // если есть, иначе null
      },
      {
        fullName: 'Gulstan Rasho',
        photo: 'team/SofiaSomai.png',
        position: 'Zahnmedizinische Fachangestellte',
        clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
        cv: null // если есть, иначе null
      },
      {
        fullName: 'Carolin Hämmerle',
        photo: 'team/carolinHämmerle.png',
        position: 'Zahnmedizinische Fachangestellte',
        clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
        cv: null // если есть, иначе null
      },
      {
        fullName: 'Sofia Samai',
        photo: 'team/sofiaSamai.png',
        position: 'Auszubildende',
        clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
        cv: null // если есть, иначе null
      },
      {
            fullName: 'Wisam Raad Mahmood',
            photo: 'team/man.png',
            position: 'Auszubildender',
            clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
            cv: null // если есть, иначе null
      },
      {
            fullName: 'Katharina Fischer',
            photo: 'team/SofiaSomai.png',
            position: 'Auszubildende',
            clinic: 'Zahnarztpraxis Tkacheva Hinterzarten',
            cv: null // если есть, иначе null
      },
      {
            fullName: 'Olha Chubakova',
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