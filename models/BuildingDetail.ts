import { Building } from "./Building";
import { Part } from "./Part";

export interface BuildingDetail extends Building {
    parts: Part[]
}