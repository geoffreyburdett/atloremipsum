import { Component, OnInit } from '@angular/core';
import { LoremGenService } from './lorem-gen.service';

@Component({
  selector: 'lorem-gen',
  template: `
  <div class="lorem">
    <div class="form-element">
      <label>Paragraphs: </label>
      <input [(ngModel)]="paragraphs" />
    </div>
    <div class="form-element">
      <button (click)="setStyle('clean')">Lady in the Streets</button>
    </div>
    <div class="form-element">
      <button (click)="setStyle('dirty')">Freak in the Sheets</button>
    </div>
    <p *ngFor="let p of lorem">
      {{p}}
    </p>
  </div>
  `,
  providers: [LoremGenService]
})

export class AppComponent implements OnInit{

  lorem: string[] = [''];
  paragraphs: number = 5;
  style: string = 'clean';

  ngOnInit(): void {
    this.getLorem();
  }

  constructor(private loremGenService: LoremGenService) {};

  setParagraphs(paragraphs:number): void {
    this.paragraphs = paragraphs;
    this.getLorem();
  }

  setStyle(style:string): void {
    this.style = style;
    this.getLorem();
  }

  getLorem(): void {
    this.loremGenService.getLorem(this.paragraphs, this.style)
      .then( lorem => {
          this.lorem = lorem;
        }
      );      
  } 
}
