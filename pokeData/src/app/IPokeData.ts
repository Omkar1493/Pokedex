import { IFastAttackInfo } from './IFastAttackInfo';
import {IPokeEvolution} from '../app/poke-card/IPokeEvolution';
export interface IPokeData {
    number: string;
    name: string;
    generation: string;
    about:string;
    types:Array<string>;
    resistant: Array<string>;
    fastattacks: Array<IFastAttackInfo>;
    maxCP:number;
    nextEvolution: Array<IPokeEvolution>;
}