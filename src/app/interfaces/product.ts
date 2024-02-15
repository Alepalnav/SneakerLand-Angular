import { OrderDetails } from "./order-details";

export interface ProductDTO {
    id: number,
    name: string,
    brand: string,
    descrip: string,
    size: number,
    image: string,
    price: number,
    stock: number,
    remove: number,
    details: OrderDetails[]
}

