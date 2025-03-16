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
import { StatistiqueDossier } from '../../../modele/StatistiqueDossier';

@Component({
  selector: 'app-candidat-eligible',
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
  templateUrl: './candidat-eligible.component.html',
  styleUrl: './candidat-eligible.component.scss'
})
export class CandidatEligibleComponent implements OnInit {

  chartType: ChartType = 'doughnut';
  eligibilityData!: ChartConfiguration['data'];
  statistiqueDossier: StatistiqueDossier = new StatistiqueDossier();

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
        hoverBackgroundColor: ['#a07af0', '#f68d2b', '#b0f07a', '#344bfd'], // Couleur de la bordure au survol
        hoverBorderColor: ['#a07af0', '#f68d2b', '#b0f07a', '#344bfd'],
      }
    }
  };
   
  constructor(private statistiqueservice: StatistiqueService) {}

  ngOnInit(): void {
   this.getDataStatistiqueDossier();
  }

  getChart() {
    this.eligibilityData = {
      labels: [
        'Dossier ok', 
        'Dossier non-eligible',
        'Dossier sous-réserve',
        'Dossier annulé'
      ],
      datasets: [
        { 
          data: [
            this.statistiqueDossier.dossierValide, 
            this.statistiqueDossier.dossierNonEligible, 
            this.statistiqueDossier.dossierSousReserve, 
            this.statistiqueDossier.dossierAnnule
          ], 
          backgroundColor: ['#a07af0', '#f68d2b', '#b0f07a', '#344bfd']
        }
      ]
    };
  }

  getDataStatistiqueDossier() {
    this.statistiqueservice.getStatistiqueDossier().subscribe(
      data => {
        if(data) {
          this.statistiqueDossier = data;

          this.getChart();
        }
      }
    )
  }

}
