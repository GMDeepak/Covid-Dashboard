import { Component, OnInit } from '@angular/core';
import { SampleServiceService } from '../sample-service.service';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  newConfirmed: number;
  newDeaths: number;
  newRecovered: number;
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;

  countries: any;
  country: any;

  active: number;
  confirmed: number;
  death: number;
  recovered: number;

  myChart: any;
  myCharts: any;
  acitveNum: number[] = [];
  confirmedNum: number[] = [];
  deaths: number[] = [];
  recoveredNum: number[] = [];
  labels: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  constructor(private service: SampleServiceService) {}

  ngOnInit(): void {
    this.service.getGlobalData().subscribe((data) => {
      this.newConfirmed = data.Global.NewConfirmed;
      this.newDeaths = data.Global.NewDeaths;
      this.newRecovered = data.Global.NewRecovered;
      this.totalConfirmed = data.Global.TotalConfirmed;
      this.totalDeaths = data.Global.TotalDeaths;
      this.totalRecovered = data.Global.TotalRecovered;
    });

    this.service.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  getCountry(name: any) {
    this.country = name;
  }

  getCountryData() {
    this.service.getCountryData(this.country).subscribe((data) => {
      var index = data.length - 1;
      this.active = data[index].Active;
      this.confirmed = data[index].Confirmed;
      this.death = data[index].Deaths;
      this.recovered = data[index].Recovered;
    });

    if (this.myChart) {
      this.myChart.destroy();
      this.myCharts.destroy();
      this.acitveNum=[];
      this.confirmedNum=[];
      this.deaths=[];
      this.recoveredNum=[];
    }

    this.service.getDailyData(this.country).subscribe((data) => {
      var index = data.length - 1;
      for (var i = index; i > index - 30; i--) {
        this.acitveNum.push(data[i].Active);
        this.confirmedNum.push(data[i].Confirmed);
        this.deaths.push(data[i].Deaths);
        this.recoveredNum.push(data[i].Recovered);
      }
    });

    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Filler,
      Legend,
      Title,
      Tooltip
    );
    this.myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Active Data',
            data: this.acitveNum,
            borderWidth: 1,
            borderColor: 'red',
          },
          {
            label: 'Confirmed Data',
            data: this.confirmedNum,
            borderWidth: 1,
            borderColor: '#0000cc',
          },
        ],
      },
    });
    this.myCharts = new Chart('myCharts', {
      type: 'scatter',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Death Data',
            data: this.deaths,
            borderColor: '#8a8a5c',
          },
          {
            label: 'Recovered Data',
            data: this.recoveredNum,
            borderColor: '#00ffaa',
          },
        ],
      },
    });

  }
}
