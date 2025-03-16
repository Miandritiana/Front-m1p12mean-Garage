import { Component, OnInit } from '@angular/core';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  FormSelectDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  
} from '@coreui/angular';

import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { StatistiqueService } from '../../../services/statistique.service';
import { StatistiqueManifestation } from '../../../modele/StatistiqueManifestation';

@Component({
  selector: 'app-candidat-interresse',
  standalone: true,
  imports: [
    AvatarComponent,
    ButtonDirective,
    ButtonGroupComponent,
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    CardHeaderComponent,
    ColComponent,
    FormCheckLabelDirective,
    FormSelectDirective,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    RowComponent,
    TableDirective,
    TextColorDirective,
    NgChartsModule
  ],
  templateUrl: './candidat-interresse.component.html',
  styleUrl: './candidat-interresse.component.scss'
})
export class CandidatInterresseComponent implements OnInit {

  chartType: ChartType = 'doughnut';
  interestedData!: ChartConfiguration['data'];
  statistiqueManifestation: StatistiqueManifestation = new StatistiqueManifestation();

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Légende à droite
        labels: {
          generateLabels: (chart: Chart) => {
            const originalLabels = chart.data.labels as string[]; // Récupérer les labels
            
            // Vérifier si les labels sont définis
            if (!originalLabels || originalLabels.length === 0) {
              return [];
            }
        
            // Vérifier si le dataset est bien défini et contient des couleurs
            const dataset = chart.data.datasets[0];
            const backgroundColors = dataset ? dataset.backgroundColor : [];
            const dataValues = dataset ? dataset.data : []; // Récupérer les valeurs du dataset
        
            // Vérifier si backgroundColors et data sont des tableaux et ont la même longueur
            if (!Array.isArray(backgroundColors) || !Array.isArray(dataValues) || 
                backgroundColors.length !== originalLabels.length || dataValues.length !== originalLabels.length) {
              return [];
            }
        
            // Retourner la légende avec les couleurs appropriées et les données associées
            return originalLabels.map((label, index) => {
              return {
                text: `${label}: ${dataValues[index]}`,  // Ajouter la donnée à côté du label
                fillStyle: backgroundColors[index],  // Utiliser la couleur du dataset pour la légende
              };
            });
          }
        }
      },
      tooltip: {
        enabled: true, // Activer les tooltips
      },
    },
    elements: {
      arc: {
        borderWidth: 1, // Définir l'épaisseur de la bordure
        hoverBackgroundColor: ['#344bfd', '#b2bbfe'], // Couleur de la bordure au survol
        hoverBorderColor: ['#344bfd', '#b2bbfe'],
      }
    }
  };
   

  constructor(private statistiqueservice: StatistiqueService) {}

  ngOnInit(): void {
    this.getDataStatistiqueManifestation();
  }
  
  getChart() {
    this.interestedData = {
      labels: [
        'Inscriptions effectuées', 
        'Inscriptions non-effectué'
      ],
      datasets: [
        { 
          data: [this.statistiqueManifestation.nombreInscrit, this.statistiqueManifestation.nombreNonInscrit], 
          backgroundColor: ['#344bfd', '#b2bbfe']
        }
      ]
    };
  }

  getDataStatistiqueManifestation() {
    this.statistiqueservice.getStatistiqueManifestation().subscribe(
      data => {
        if(data) {
          this.statistiqueManifestation = data;

          this.getChart();
        }
      }
    )
  }
}
