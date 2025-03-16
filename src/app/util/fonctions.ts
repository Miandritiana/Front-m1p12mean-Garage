export class Fonctions {
  
  public static formatedDate(date: Date, isDateNaissance: boolean): string {
      // Si la date est vide ou non définie, on retourne une chaîne vide
      if (date == null) {
        return '';
      }
      
      const parsedDate = new Date(date);
  
      if (isNaN(parsedDate.getTime())) {
        return 'Date invalide'; // Si la date n'est pas valide
      }
  
      let options: Intl.DateTimeFormatOptions;
  
      if (isDateNaissance) {
        options = {
          year: 'numeric',  // Année en format numérique
          month: 'long',    // Mois en texte complet
          day: 'numeric'    // Jour du mois en numérique
        };
      } else {
        options = {
          weekday: 'long',  // Jour de la semaine en texte complet
          year: 'numeric',  // Année en format numérique
          month: 'long',    // Mois en texte complet
          day: 'numeric',   // Jour du mois en numérique
          hour: '2-digit',  // Heure en format 2 chiffres
          minute: '2-digit' // Minute en format 2 chiffres
        };
      }
  
      return new Intl.DateTimeFormat('fr-FR', options).format(parsedDate);
  }

  public static getColorStatut(etat:number): string {
    if(etat==1){
      return 'warning'
    }
    else if (etat==11){
      return 'secondary'
    }
    else if (etat==21 || etat==22 || etat==51){
      return 'success'
    }
    else if(etat==31){
      return 'primary'
    }
    else if(etat==40){
      return 'danger'
    }
    else{
      return 'light'
    }
  }

  public static formatedHeure(heure: string | null | undefined): string {
    if (!heure) return ''; // ou retourne une valeur par défaut si nécessaire
    const [h, m] = heure.split(':');
    return `${h}h${m}`;
  }

  public static formatedDateFormat(date: any): string {
    if (!(date instanceof Date)) {
      date = new Date(date); // Convertit en objet Date si ce n'en est pas déjà un
    }
    
    if (isNaN(date.getTime())) { // Vérifie si la date est valide
      return ''; // Ou un message d'erreur selon tes besoins
    }
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  } 
}