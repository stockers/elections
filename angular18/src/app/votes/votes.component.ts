import { Component, OnInit } from '@angular/core';
import { VotingDataService } from '../services/voting-data.service';
import { CommonModule } from '@angular/common';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-votes',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './votes.component.html',
  styleUrl: './votes.component.css'
})
export class VotesComponent implements OnInit {
  constructor(private votingDataService : VotingDataService) {}
  pieVotingData : any[] = [];
  barVotingData : any[] = [];
  photoUrl? : string;

  Highcharts: typeof Highcharts = Highcharts;
  
  chartOptions1: Highcharts.Options = {};
  chartUpdateFlag1 : boolean = false;

  chartOptions2: Highcharts.Options = {};
  chartUpdateFlag2 : boolean = false;

  chartOptions3: Highcharts.Options = {};
  chartUpdateFlag3 : boolean = false;


  updateChart1(seriesData : any) {
    //console.log("updateChart called");
    this.chartOptions1 = {
      chart: { type: 'pie' },
      title: {
          text: 'Votes By Party',
          align: 'center'
      },
      plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                x:20, y:20
            }, {
                enabled: true,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.0em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
      },      
      series: [{
        type: 'pie',
        name: 'votes',
        data: seriesData,
        point: {
          events: {
          click: this.chartClicked1.bind(this) }
        }              
      }]
      
    }
    this.chartUpdateFlag2 = true;
  }

  updateChart2(seriesData : any) {
    //console.log("updateChart called");    
    this.chartOptions2 = {
      chart: { type: 'spline' },
      title: {
          text: 'Vote Strength For Party',
          align: 'center'
      },
      plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,                
                style: {
                    fontSize: '1.0em',
                    textOutline: 'none',
                    opacity: 0.7
                }
            }]
        }
      },      
      series: [{
        type: 'spline',
        name: 'vote strength',
        data: seriesData,
        point: {
          events: {
          click: this.chartClicked2.bind(this) }
        }              
      }],
      yAxis:{ title: { text: 'Vote Count'} }
      
    }
    this.chartUpdateFlag1 = true;
  }

  updateChart3(seriesData : any[]) {
    console.log("updateChart3 called");  
  
    this.chartOptions3 =  {
      title: { text: 'Vote Strengths'},
      series: [ 
        {
          name: 'Parties',
          type: 'bar',
          data: seriesData.map(i=>i.y),
          point: {
            events: {
            click: this.chartClicked3.bind(this) }
          }              
  
        }
      ],
      xAxis: {
        crosshair: true,
        categories: seriesData.map(i=>i.name)
      },
      colors: [
        '#D9844B'
      ],
      yAxis:{ title: { text: 'Average Voting Strength'} }
    };
    
    this.chartUpdateFlag3 = true;
  }



  ngOnInit(): void {
    this.getVotesByParty();  
  }

  getVotesByParty(){
    this.votingDataService.getVotesByParty().subscribe(data =>{
      this.pieVotingData = data;
      let seriesData = data.map((v,i)=>{return {x: v.partyId, y:v.votes, name:v.partyName}});
      this.updateChart1(seriesData)
    });
    this.votingDataService.getVoteStrengthsByParty().subscribe(data=>{
      this.barVotingData = data;
      let seriesData = data.map((v,i)=>{return {x: v.partyId, y:v.strength, name:v.partyName}});
      this.updateChart3(seriesData)      
    })
  }

  getVoteStrengths(partyId : number){
    this.votingDataService.getVoteStrengths(partyId).subscribe(data =>{   
      console.log(data);
      let seriesData = data.map((v,i)=>{return {x: v.strength, y:v.votes}});
      this.updateChart2(seriesData)
    });
  }
  chartClicked1(e : any)
  {
    console.log(e.point.x);
    this.photoUrl = this.pieVotingData.find(i => i.partyId == e.point.x).photoUrl;       
    this.getVoteStrengths(e.point.x);
  }

  chartClicked2(e : any)
  {
    console.log(e);
  }

  chartClicked3(e : any)
  {   
    let p = this.barVotingData[e.point.x];   
    let party : any = this.pieVotingData.find(i => i.partyId == p.partyId);  
    
    this.photoUrl = party.photoUrl;
    this.getVoteStrengths(party.partyId);
  }

}
