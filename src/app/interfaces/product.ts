export interface ProductDTO {
    id:      number;
    name:    string;
    brand:   string;
    descrip: string;
    size:    number;
    image:   string;
    price:   number;
    stock:   number;
    remove:  number;
    details: Detail[];
}
export interface Order {
    id_order: number;
    user:     number;
    date:     Date;
    state:    string;
    details:  Detail[];
}
export interface OrderDelivered {
    user:     number;
    date:     Date;
    state:    string;
}
    
export interface DetailAdd {
    order:   number;
    product: number;
    cant:    number;
    price:   number;
}
export interface Detail {
    order:   number;
    product: ProductDTO;
    cant:    number;
    price:   number;
}
export interface AddToCart {
    product: ProductDTO;
    cant:    number;
    price:   number;
}



