import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SignalRService } from './signalR-service';
import { Color } from './components/color.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ColorsVotes';
  colors: Color[] | undefined;


  constructor(private httpClient: HttpClient,
    private signalRService: SignalRService) { }

  ngOnInit() {

    this.signalRService.startConnectionToServer();

    this.httpClient.get<Color[]>("assets/Colors-List.json")
      .subscribe((res: any) => {
        this.colors = res.data;
      });


    //this.signalRService.addTransferClickDataListener();

  }
  colorClicked(color: Color) {
    this.signalRService.broadcastColorVote(color);
  }
}
