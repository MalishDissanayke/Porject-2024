import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ReportService } from '../../../../services/report.service';
import { ReportHelper } from '../../../../shared/report-helper';

@Component({
  selector: 'app-material-report',
  templateUrl: './material-report.component.html',
  styleUrls: ['./material-report.component.scss']
})
export class MaterialReportComponent implements OnInit, AfterViewInit {

  materialData: any[] = [];

  constructor(private reportService: ReportService) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.materialData = await this.reportService.getMaterialQuantities();
      console.log('Material data:', this.materialData); // Logging the data
      this.drawChart(); // Draw the chart after loading data
    } catch (error) {
      console.error('Failed to load material quantities:', error);
    }
  }

  ngAfterViewInit(): void {
    if (this.materialData.length > 0) {
      this.drawChart();
    }
  }

  private drawChart(): void {
    const canvas = <HTMLCanvasElement>document.getElementById('materialQuantitiesChart');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions and styling
    const padding = 50;
    const chartHeight = canvas.height - 2 * padding;
    const chartWidth = canvas.width - 2 * padding;
    const maxQuantity = Math.max(...this.materialData.map(d => Number(d.quantity)));
    const barWidth = chartWidth / this.materialData.length;

    // Draw the y-axis labels
    const yAxisLabelCount = 10;
    const yAxisStep = maxQuantity / yAxisLabelCount;
    for (let i = 0; i <= yAxisLabelCount; i++) {
      const y = padding + (chartHeight / yAxisLabelCount) * i;
      const label = (maxQuantity - yAxisStep * i).toFixed(0);
      ctx.fillStyle = 'black';
      ctx.fillText(label, padding - 40, y + 5); // Adjusted for proper alignment
      ctx.beginPath();
      ctx.moveTo(padding - 5, y);
      ctx.lineTo(padding, y);
      ctx.stroke();
    }

    // Draw the chart
    this.materialData.forEach((data, index) => {
      const barHeight = (Number(data.quantity) / maxQuantity) * chartHeight;
      const x = padding + index * barWidth;
      const y = canvas.height - padding - barHeight;

      // Draw the bar
      ctx.fillStyle = 'steelblue';
      ctx.fillRect(x, y, barWidth - 10, barHeight);

      // Draw the name label
      ctx.fillStyle = 'black';
      ctx.fillText(data.name.toString(), x, canvas.height - padding + 20);
    });

    // Draw the axes
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
  }

  print(): void {
    ReportHelper.print('materialReport');
  }

  exportToExcel(): void {
    const csvData = this.convertToCSV(this.materialData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Material_Report.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  private convertToCSV(data: any[]): string {
    const header = 'Name,Quantity\n';
    const rows = data.map(d => `${d.name},${d.quantity}`).join('\n');
    return header + rows;
  }
}
