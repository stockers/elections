import { Routes } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { VotesComponent } from './votes/votes.component';

export const routes: Routes = [    
    { path: 'votes', component: VotesComponent },
    { path: 'person', component: PersonComponent },
    // Add more routes as needed
  ];
  