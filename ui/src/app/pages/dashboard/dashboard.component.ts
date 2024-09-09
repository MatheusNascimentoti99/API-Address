import { Component, inject, ViewChild } from '@angular/core';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommunityService } from '@app/services/community.service';
import { Community, Dashboard } from '@app/interface/Community';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Observable, Subject } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChartComponent, NgApexchartsModule } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    NgApexchartsModule
  ]
})
export class DashboardComponent {
  private communityService = inject(CommunityService);
  dashboardData: Dashboard | null = null;
  communities: Community[] = [];
  countAddressesInCommunity$: Observable<number> | undefined;
  destroyed = new Subject<void>();
  cols = 3;
  chartOptions: ChartOptions = {
    series: [],
    chart: {
      height: 120,
      type: "pie"
    },
    labels: [],
  }

  constructor() {
    this.communityService.findDashboard().subscribe(value => {
      this.dashboardData = value;
      this.chartOptions.series = this.dashboardData?.communityCountGroup.map((value) => value.countAddress) ?? [];
      this.chartOptions.labels = this.dashboardData?.communityCountGroup.map(value => `${value.name}(${value.id})`) ?? []
    });
    this.findCommunities();

    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        this.cols = result.matches ? 1 : 3;
      });
  }

  selectionChange(event: MatSelectChange) {
    this.countAddressesInCommunity$ = this.communityService.countAddressesInCommunity(event.value).pipe(map(value => {
      return value.countAddress
    }))
  }

  findCommunities() {
    this.communityService.findAll().subscribe(communities => {
      this.communities = communities;
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
