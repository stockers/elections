import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Person } from '../person/person';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VotingDataService {

  private APIUrl = environment.electionsAPIUrl;
  
  constructor(private http: HttpClient) {
    console.log(this.APIUrl);
  }
  getVotesByParty(): Observable<any[]> {
      return this.http.get<any>(this.APIUrl + '/VotingResults/VotesByParty');
  }

  getVoteStrengthsByParty(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/VotingResults/VoteStrengthsByParty/');
  }

  getVoteStrengths(partyId : number): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/VotingResults/VoteStrengths/'+partyId);
  }



  addPerson(person : Person): Observable<Person> {
    console.log('adding person');
    return this.http.post<Person>(this.APIUrl + '/Person', person);
  }
  updatePerson(person : Person): Observable<Person> {
    console.log('updating person');
    return this.http.put<Person>(this.APIUrl + '/Person', person);
  }

  getPersonList(search? : string): Observable<Person[]> {
    console.log('getting person');
    let optionalSearch = search === undefined ? '' : '?search=' + search; 
    return this.http.get<Person[]>(this.APIUrl + '/Person' + optionalSearch);
  }

  deletePerson(personId : number): Observable<any> {
    console.log('deleting person ' + personId);
    return this.http.delete<Person>(this.APIUrl + '/Person/' + personId);
  }

}
