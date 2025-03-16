import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  
  {
    title: true,
    name: 'Client'
  },
  {
    name: 'Acceuil',
    url: '/acceuil',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Devis',
    url: '/devis',
    iconComponent: { name: 'cil-file' },
  },
  {
    name: 'Suivi',
    url: '/suivi',
    iconComponent: { name: 'cil-check-circle' },
  },


  
  {
    title: true,
    name: 'Manager'
  },
  {
    name: 'Demande préstation',
    url: '/demande-prestation',
    iconComponent: { name: 'cil-file' },
  },
  {
    name: 'Parametrage',
    url: '/parametre',
    iconComponent: { name: 'cil-settings' },
    children: [
      {
        name: 'Mécanicien',
        url: '/parametre-mecanicien',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Préstation',
        url: '/parametre-prestation',
        icon: 'nav-icon-bullet'
      },
    ]
  },
  {
    name: 'Historique',
    url: '/historique',
    iconComponent: { name: 'cil-history' },
  },



  {
    title: true,
    name: 'Mécanicien'
  },
  {
    name: 'Tache',
    url: '/tache',
    iconComponent: { name: 'cil-task' },
  },

  
];
