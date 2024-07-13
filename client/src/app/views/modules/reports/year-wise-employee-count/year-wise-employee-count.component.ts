import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from "../../../../shared/abstract-component";
import {ChartDataset} from "chart.js";

// @ts-ignore
import {Color, Label} from "ng2-charts";
import {ThemeManager} from "../../../../shared/views/theme-manager";
import {ReportService} from "../../../../services/report.service";
import {ReportHelper} from "../../../../shared/report-helper";

@Component({
  "selector": 'app-year-wise-employee-count',
  "templateUrl": './year-wise-employee-count.component.html',
  "styleUrls": ['./year-wise-employee-count.component.scss']
})
export class YearWiseEmployeeCountComponent extends AbstractComponent implements OnInit {

  yearWiseData: any[];

  public lineChartData: ChartDataset[] = [
    { data: [], label: 'Employee Count' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions  = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      disable: true,
      text: 'year wise employee chart'
    },
    scales: {
      xAxes: [ {
        ticks: { fontColor: ThemeManager.isDark() ? 'white' : 'black' },
        gridLines: { color: ThemeManager.isDark() ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
      } ],
      yAxes: [ {
        ticks: { fontColor: ThemeManager.isDark() ? 'white' : 'black'  },
        gridLines: { color: ThemeManager.isDark() ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
      } ]}
  };
  public lineChartColors: Color[] = [
    {

      borderColor: 'black',
      backgroundColor: 'rgba(50, 240, 100, 1)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  displayedColumns: string[] = ['year', 'count'];


  constructor(private reportservice: ReportService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.refreshData();
  }

  async loadData(): Promise<any> {

    this.yearWiseData = await this.reportservice.getYearWiseEmployeeCount(10);

    this.lineChartLabels = [];
    this.lineChartData[0].data = [];

    for (const yearData of this.yearWiseData){
      this.lineChartLabels.unshift(yearData.year);
      this.lineChartData[0].data.unshift(yearData.count);
    }


  }

  updatePrivileges(): any {
  }
  print(): void{
    ReportHelper.print('yearWiseEmployeeCountReport');
  }


}
