import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorBoxComponent } from './components/color-box/color-box.component';
import { HttpClientModule } from '@angular/common/http';
import { SignalRService } from './signalR-service';

@NgModule({
  declarations: [
    AppComponent,
    ColorBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
