import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive  } from '@angular/router';
import { VotesComponent } from "./votes/votes.component";
import { PersonComponent } from "./person/person.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, VotesComponent, PersonComponent, RouterLink, RouterLinkActive ]
})
export class AppComponent {
  title = 'Elections - Party voting pledges';
}
