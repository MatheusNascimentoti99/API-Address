import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommunityService } from '@app/services/community.service';
import { Community, Dashboard } from '@app/interface/Community';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  ]
})
export class DashboardComponent {
  private communityService = inject(CommunityService);
  dashboardData: Dashboard | null = null;
  communities: Community[] = [];
  countAddressesInCommunity$: Observable<number> | undefined;
  constructor() {
    this.communityService.findDashboard().subscribe(value => {
      this.dashboardData = value;
    });
    this.findCommunities();
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
}
