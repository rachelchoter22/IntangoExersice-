import { Component, Input } from '@angular/core';
import { SignalRService } from 'src/app/signalR-service';
import { Color } from '../color.model';

@Component({
  selector: 'color-box',
  templateUrl: './color-box.component.html',
  styleUrls: ['./color-box.component.scss']
})
export class ColorBoxComponent {
  @Input()
  color!: Color;
  constructor(private signalRService: SignalRService) {
  }
  ngOnInit(): void {
    this.signalRService.colorChanges$?.subscribe((color: Color) => {
      if (color.colorId == this.color?.colorId)
        this.color.colorVotes++;
    })
  }
  get colorHexWithHash() {
    return `#${this.color?.colorHex}`;
  }
  get widthOfProgressBar() {
    if (this.signalRService.getFavoritesColorsList().includes(this.color.colorId)) {
      return '200px';
    }
    else {
      this.signalRService.getMaxVotesToColor();
      let width = 200 * (this.color.colorVotes / this.signalRService.getMaxVotesToColor());
      return `${width.toString()}px`
    }
  }
  get votesWidth() {
    let res = undefined;
    if (this.color?.colorVotes) return 'normal';
    else
      res = this.color?.colorVotes;
    return res || 1 * 5;
  }
}
