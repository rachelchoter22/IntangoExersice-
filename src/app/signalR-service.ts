import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { Color } from './components/color.model';


@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private hubConnection!: HubConnection;
    private conectionHasStarted: boolean | undefined;
    data: any;
    colors: Color[] = [];
    colorChanges$ = new Subject<Color>();

    constructor(private httpClient: HttpClient) { }
    public startConnectionToServer = () => {
        this.getColorsFromFile();
        this.createConnection();
        this.startConnection();
    }
    createConnection() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7049/click')
            .build();
        this.addTransferClickDataListener();
    }
    startConnection() {
        this.hubConnection
            .start()
            .then(() => {
                console.log('Connection started')
                this.conectionHasStarted = true;
            })
            .catch(err => console.log('Error while starting connection: ' + err))
    }
    public addTransferClickDataListener = () => {
        this.hubConnection.on('ReceiveColorVotes', (color: Color) => {
            this.colorChanges$?.next(color)
        });
    }
    public broadcastColorVote(color: Color) {
        this.hubConnection.invoke('ClickOnColor', color);
    }
    public getColorsFromFile() {
        this.httpClient.get<Color[]>("assets/Colors-List.json")
            .subscribe((res: any) => {
                this.colors = res.data;
            });

    }
    public getFavoritesColorsList(): number[] {
        let currentMax = this.getMaxVotesToColor();

        return this.colors?.filter(x => x.colorVotes == currentMax).map(x => x.colorId);
    }
    public getMaxVotesToColor() {
        let currentMax = 0;
        this.colors?.forEach(color => {
            if (color.colorVotes > currentMax) {
                currentMax = color.colorVotes;
            }
        })
        return currentMax;
    }
}