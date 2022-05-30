import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { mapdata } from './mapdata';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'app-mapgrid',
  templateUrl: './mapgrid.component.html',
  styleUrls: ['./mapgrid.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class MapgridComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: any) {}
  elem;

  ngOnInit() {
    this.gridView = this.gridData;
    this.elem = document.getElementById('map-grid');
  }
  
  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  public showTooltip(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (
      (element.nodeName === 'TD' || element.nodeName === 'TH') &&
      element.offsetWidth < element.scrollWidth
    ) {
      this.tooltipDir.toggle(element);
    } else {
      this.tooltipDir.hide();
    }
  }

  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  public gridData: any[] = mapdata;
  public gridView: any[];

  public mySelection: string[] = [];

  public buttonCount = 5;
  public info = true;
  public pageSizes = true;
  public previousNext = true;
  public position = 'bottom';

  public pageSize = 13;

  public onFilter(inputValue: string): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'full_name',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'job_title',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'budget',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'phone',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'address',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
}
