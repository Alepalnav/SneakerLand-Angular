import { Order } from "./order";

export interface User {
    id:number,
    username:string,
    name:string,
    email:string,
    password:string,
    address:string,
    role:string,
    orders:Order[]
}
