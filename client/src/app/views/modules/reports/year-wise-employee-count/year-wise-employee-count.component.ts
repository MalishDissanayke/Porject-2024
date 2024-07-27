import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReportService } from '../../../../services/report.service';
import { ReportHelper } from '../../../../shared/report-helper';

@Component({
  selector: 'app-year-wise-employee-count',
  templateUrl: './year-wise-employee-count.component.html',
  styleUrls: ['./year-wise-employee-count.component.scss']
})
export class YearWiseEmployeeCountComponent implements OnInit, AfterViewInit {

  yearWiseData: any[] = [];

  constructor(private reportService: ReportService) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  ngAfterViewInit(): void {
    this.drawChart();
  }

  async loadData(): Promise<void> {
    try {
      this.yearWiseData = await this.reportService.getYearWiseEmployeeCount(10);
      console.log('Year wise data:', this.yearWiseData); // Logging the data
      this.drawChart(); // Draw the chart after loading data
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

  private drawChart(): void {
    const canvas = <HTMLCanvasElement>document.getElementById('employeeCountChart');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions and styling
    const padding = 50;
    const chartHeight = canvas.height - 2 * padding;
    const chartWidth = canvas.width - 2 * padding;
    const maxCount = Math.max(...this.yearWiseData.map(d => d.count));
    const barWidth = chartWidth / this.yearWiseData.length;

    // Draw the y-axis labels
    const yAxisLabelCount = 10;
    const yAxisStep = Math.ceil(maxCount / yAxisLabelCount);
    for (let i = 0; i <= yAxisLabelCount; i++) {
      const yValue = yAxisStep * i;
      const y = canvas.height - padding - (yValue / maxCount) * chartHeight;
      const label = yValue.toString();
      ctx.fillStyle = 'black';
      ctx.fillText(label, padding - 40, y + 5); // Adjusted for proper alignment
      ctx.beginPath();
      ctx.moveTo(padding - 5, y);
      ctx.lineTo(padding, y);
      ctx.stroke();
    }

    // Draw the chart
    this.yearWiseData.forEach((data, index) => {
      const barHeight = (data.count / maxCount) * chartHeight;
      const x = padding + index * barWidth;
      const y = canvas.height - padding - barHeight;

      // Draw the bar
      ctx.fillStyle = 'steelblue';
      ctx.fillRect(x, y, barWidth - 10, barHeight);

      // Draw the year label
      ctx.fillStyle = 'black';
      ctx.fillText(data.year.toString(), x, canvas.height - padding + 20);
    });

    // Draw the axes
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
  }
}
