import { Component } from '@angular/core';
import {myvar} from '../../assets/app-data';
import { IPokeData } from '../IPokeData';
import { IFastAttackInfo } from '../IFastAttackInfo';
import { IPokeEvolution } from './IPokeEvolution';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.css']
})

export class PokeCardComponent {
  
  public data :Array<IPokeData>;
  public someInput:string;
  public selectedType:string;
  public types: Set<string> = new Set<string>();
  public isSorted: boolean;
  public someValue:string;
  constructor() { 
    this.loadData();
  }
  
  public pokeSearch(): void {
      this.data = this.data
        .filter(elem => (elem.name)
          .includes(this.someInput) 
            && !(((elem.types)
              .filter(val => val === this.selectedType))
              .length <= 0));
  }

  public refresh(): void {
    this.loadData();
  }

  public loadData(): void {
    this.data = myvar.map(x => {
      x.Types.forEach(type => this.types.add(type));
      return <IPokeData> {
        number: x.Number,
        name: x.Name,
        generation: x.Generation,
        about: x.About,
        types: x.Types,
        resistant: x.Resistant,
        fastattacks: x["Fast Attack(s)"].map(val => { return <IFastAttackInfo> {
          name: val.Name,
          type: val.Type,
          damage: val.Damage
        }}),
        maxCP:x.MaxCP,
        nextEvolution: 
          (x["Next evolution(s)"])? x["Next evolution(s)"].map(val => { return <IPokeEvolution> {
            name: val.Name,
            number: val.Number
          }})  : []
    }})
  }

  public displayByPower(){
    if (this.isSorted) {
      this.data = this.data.sort((n1,n2) => n1.maxCP - n2.maxCP);
      this.isSorted = false;
    } else {
      this.data = this.data.sort((n1,n2) => n2.maxCP - n1.maxCP);
      this.isSorted = true;
    }
  }

  public findEvolution(){
    let storedVal: Array<IPokeData> = [];
    this.data.filter(x => x.name === this.someValue)[0].nextEvolution.forEach(z => storedVal.push(this.data.filter(val => val.name == z.name)[0]));
    this.data = storedVal;
  }
}
