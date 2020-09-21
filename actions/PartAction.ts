import { Part } from "../models/Part"
import { PartDetail } from "../models/PartDetail";
import * as Actions from "../tools/RestClient";

export const GetAll = (buildingId: string) => {
    return Actions.Get<Part[]>(`/api/buildings/${buildingId}/parts`).then(resp => resp.data);
}

export const GetById = (buildingId: string, id: string) => {
    return Actions.Get<PartDetail>(`/api/buildings/${buildingId}/parts/${id}`).then(resp => resp.data);
}

export const Update = (buildingId: string, id: string, part: { name: string, startDate: string, endDate: string, budget: number }) => {
    return Actions.Put(`/api/buildings/${buildingId}/parts/${id}`, part).then(resp => resp.status === 200);
}

export const Add = (buildingId: string, part: { name: string, startDate: string, endDate: string, budget: number }) => {
    return Actions.Post(`/api/buildings/${buildingId}/parts`, part).then(resp => resp.status === 200);
}

export const Delete = (buildingId: string, id: string) => {
    return Actions.Delete(`/api/buildings/${buildingId}/parts/${id}`).then(resp => resp.status === 200)
}