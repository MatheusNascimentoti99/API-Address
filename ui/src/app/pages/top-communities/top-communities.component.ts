import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { CommunityService } from '@app/services/community.service';
import { NavigationStart, Router } from '@angular/router';
import { Community } from '@app/interface/Community';

@Component({
  selector: 'app-top-communities',
  templateUrl: './top-communities.component.html',
  styleUrl: './top-communities.component.scss',
  standalone: true,
  imports: [MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    NgFor
  ],
})
export class TopCommunitiesComponent {
  mostPopularCommunities: Community[] = [];

  constructor(private communityService: CommunityService) { 
  }
  ngOnInit() {
    this.findMostPopularCommunities();
  }

  findMostPopularCommunities() {
    this.communityService.findMostPopular().subscribe(response => {
      this.mostPopularCommunities = response;
    });
  }
}
