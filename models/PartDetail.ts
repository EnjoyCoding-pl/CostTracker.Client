import { Part } from "./Part";
import { Cost } from "./Cost";

export interface PartDetail extends Part {
    costs: Cost[]
}