import { Component, Input, OnInit } from '@angular/core';
import { VotingDataService } from '../../services/voting-data.service';
import { Person } from '../person';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Party } from '../../party/party';

@Component({
  selector: 'app-add-edit-person',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './add-edit-person.component.html',
  styleUrl: './add-edit-person.component.css'
})
export class AddEditPersonComponent implements OnInit {

  @Input() person!:Person;
  model : Person = this.person;
  parties : Party[] = [];

  constructor(private votingDataService: VotingDataService) { }

  ngOnInit(): void {
    this.model = this.person; 
    this.getParties(); // needs caching or injecting as a provider, as infrequently changes
  }

  getParties(){
    this.votingDataService.getVotesByParty().subscribe(res =>{      
      this.parties = res.map(i=>{return {id: i.partyId, name: i.partyName}});
      //console.log(this.parties);
    })
  }
  addPerson(){    
      this.votingDataService.addPerson(this.model).subscribe(res =>{
        alert(res.toString());
      })
  }

  updatePerson(){
      this.votingDataService.updatePerson(this.model).subscribe(res =>{
        alert(res.toString());
    })
  }
}