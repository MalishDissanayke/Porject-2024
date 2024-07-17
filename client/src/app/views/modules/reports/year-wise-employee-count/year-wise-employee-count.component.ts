import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../../services/report.service';
import { ReportHelper } from '../../../../shared/report-helper';

@Component({
  selector: 'app-year-wise-employee-count',
  templateUrl: './year-wise-employee-count.component.html',
  styleUrls: ['./year-wise-employee-count.component.scss']
})
export class YearWiseEmployeeCountComponent implements OnInit {

  yearWiseData: any[] = [];

  constructor(private reportService: ReportService) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.yearWiseData = await this.reportService.getYearWiseEmployeeCount(10);
      console.log('Year wise data:', this.yearWiseData); // Logging the data
    } catch (error) {
      console.error('Failed to load year-wise employee count:', error);
    }
  }

  print(): void {
    ReportHelper.print('yearWiseEmployeeCountReport');
  }

  exportToExcel(): void {
    const csvData = this.convertToCSV(this.yearWiseData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Year_Wise_Employee_Count_Report.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  private convertToCSV(data: any[]): string {
    const header = 'Year,Count\n';
    const rows = data.map(d => `${d.year},${d.count}`).join('\n');
    return header + rows;
  }
}
