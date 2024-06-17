import { Component, OnInit } from '@angular/core';
import { VotingDataService } from '../services/voting-data.service';
import { AddEditPersonComponent } from './add-edit-person/add-edit-person.component';
import { CommonModule } from '@angular/common';
import { Person } from './person';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, AddEditPersonComponent, FormsModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent implements OnInit {
  personList:Person[] = [];
  modalTitle:any;
  activateAddEditPerson:boolean = false;
  person:Person = this.newPerson();
  searchText : string = "";

  constructor(private votingDataService: VotingDataService) { }

  ngOnInit(): void {
    this.refreshPersonList();
  }

  refreshPersonList() {
    this.votingDataService.getPersonList(this.searchText).subscribe(data =>{
      this.personList = data;
    });
  }

  newPerson() : Person {
    return {
      id:0,
      firstName:"",
      lastName:"",
      addressLine1:"",
      addressLine2:"",
      votingForPartyId:0,
      strength:0
    }
  }
  addPerson(){
    this.person= this.newPerson();
    this.modalTitle = "Add Person";
    this.activateAddEditPerson = true;
  }

  editPerson(item: any){
    this.person.id = item.id;
    this.person.firstName = item.firstName;
    this.person.lastName = item.lastName;
    this.person.addressLine1 = item.addressLine1;
    this.person.addressLine2 = item.addressLine2;
    this.person.votingForPartyId = item.votingForPartyId;
    this.person.strength = item.strength;
    console.log(this.person);
    this.activateAddEditPerson = true;
    this.modalTitle = "Update Person";
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.votingDataService.deletePerson(item.id).subscribe(data =>{
        alert(data.toString());
        this.refreshPersonList();
      })
    }
  }

  closeClick(){
    this.activateAddEditPerson=false;
    this.refreshPersonList();
  }
}
