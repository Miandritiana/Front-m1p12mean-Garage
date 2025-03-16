import { Component } from '@angular/core';
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
  TextColorDirective
} from '@coreui/angular';
import { NgChartsModule } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { StatistiqueService } from '../../../services/statistique.service';
import { StatistiqueAdmission } from '../../../modele/StatistiqueAdmission';

@Component({
  selector: 'app-statistique-admission',
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
  templateUrl: './statistique-admission.component.html',
  styleUrl: './statistique-admission.component.scss'
})
export class StatistiqueAdmissionComponent {

  chartType: ChartType = 'doughnut';
  chartAdmission!: ChartConfiguration['data'];
  statistiqueAdmission: StatistiqueAdmission = new StatistiqueAdmission();

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
        hoverBackgroundColor: ['#7768f5', '#b2bbfe'], // Couleur de la bordure au survol
        hoverBorderColor: ['#7768f5', '#b2bbfe'],
      }
    }
  };
   
  constructor(private statistiqueservice: StatistiqueService) {}

  ngOnInit(): void {
   this.getDataStatistiqueConcours();
  }

  getChart() {
    this.chartAdmission = {
      labels: [
        'Admis', 
        'Non-admis'
      ],
      datasets: [
        { 
          data: [
            this.statistiqueAdmission.admis, 
            this.statistiqueAdmission.nonAdmis, 
          ], 
          backgroundColor: ['#7768f5', '#b2bbfe']
        }
      ]
    };
  }

  getDataStatistiqueConcours() {
    this.statistiqueservice.getStatistiqueAdmission().subscribe(
      data => {
        if(data) {
          this.statistiqueAdmission = data;

          this.getChart();
        }
      }
    )
  }
}
