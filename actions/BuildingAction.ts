import { Building } from "../models/Building"
import { BuildingDetail } from "../models/BuildingDetail";
import * as Actions from "../tools/RestClient";

export const GetAll = () => {
    return Actions.Get<Building[]>('/api/buildings').then(resp => resp.data);
}

export const GetById = (id: string) => {
    return Actions.Get<BuildingDetail>(`/api/buildings/${id}`).then(resp => resp.data);
}

export const Update = (id: string, building: { name: string }) => {
    return Actions.Put(`/api/buildings/${id}`, building).then(resp => resp.status === 200);
}

export const Add = (building: { name: string }) => {
    return Actions.Post(`/api/buildings`, building).then(resp => resp.status === 200);
}

export const Delete = (id: string) => {
    return Actions.Delete(`/api/buildings/${id}`).then(resp => resp.status === 200)
}