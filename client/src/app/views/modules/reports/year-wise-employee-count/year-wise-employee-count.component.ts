import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../../../shared/abstract-component';
import { ReportService } from '../../../../services/report.service';
import { ReportHelper } from '../../../../shared/report-helper';

@Component({
  selector: 'app-year-wise-employee-count',
  templateUrl: './year-wise-employee-count.component.html',
  styleUrls: ['./year-wise-employee-count.component.scss']
})
export class YearWiseEmployeeCountComponent extends AbstractComponent implements OnInit {

  yearWiseData: any[];
  chartData: any[] = [];
  view: any[] = [700, 400]; // Size of the chart

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Employee Count';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  displayedColumns: string[] = ['year', 'count'];

  constructor(private reportService: ReportService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<any> {
    this.yearWiseData = await this.reportService.getYearWiseEmployeeCount(10);

    this.chartData = this.yearWiseData.map(data => ({
      name: data.year,
      value: data.count
    }));
  }

  updatePrivileges(): any {
    // Implement update privileges logic if needed
  }

  print(): void {
    ReportHelper.print('yearWiseEmployeeCountReport');
  }
}
