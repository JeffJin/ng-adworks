import { Component, Input } from '@angular/core';
import { DxChartModule } from 'devextreme-angular';
import { DxChartTypes } from 'devextreme-angular/ui/chart';
import { ComplaintsWithPercent, ReportsService } from './reports.service';

@Component({
  selector: 'app-asset-report',
  imports: [
    DxChartModule
  ],
  providers: [
    ReportsService
  ],
  templateUrl: './asset-report.component.html',
  styleUrl: './asset-report.component.scss'
})
export class AssetReportComponent {
  @Input({ required: true }) title!: string;

  dataSource: ComplaintsWithPercent[];

  constructor(service: ReportsService) {
    this.dataSource = service.getComplaintsData();
  }

  customizeTooltip = ({ points, argumentText }: { points: any[], argumentText: string }) => ({
    html: `<div><div class='tooltip-header'>${
        argumentText}</div>`
      + '<div class=\'tooltip-body\'><div class=\'series-name\'>'
      + `<span class='top-series-name'>${points[0].seriesName}</span>`
      + ': </div><div class=\'value-text\'>'
      + `<span class='top-series-value'>${points[0].valueText}</span>`
      + '</div><div class=\'series-name\'>'
      + `<span class='bottom-series-name'>${points[1].seriesName}</span>`
      + ': </div><div class=\'value-text\'>'
      + `<span class='bottom-series-value'>${points[1].valueText}</span>`
      + '% </div></div></div>',
  });

  customizeLabelText: any = ({ valueText }: {valueText: string}) => `${valueText}%`;
}
