import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Community, CommunityForm, Dashboard } from '@app/interface/Community';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private httpClient: HttpClient) {
  }

  create(community: CommunityForm) {
    return this.httpClient.post('api/community', community);
  }

  findAll() {
    return this.httpClient.get<Community[]>('api/community');
  }

  findMostPopular() {
    return this.httpClient.get<Community[]>('api/community/top');
  }

  findDashboard() {
    return this.httpClient.get<Dashboard>('api/community/dashboard');
  }
}
