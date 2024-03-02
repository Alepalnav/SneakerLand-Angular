import { Routes } from "@angular/router";
import { ListProductsComponent } from "./list-products/list-products.component";
import { FormComponent } from "./form/form.component";
import { DetailsComponent } from "./details/details.component";
import { ListBrandComponent } from "./list-brand/list-brand.component";

export const routes: Routes = [
    {path: '', component: ListProductsComponent},
    {path: 'edit/:id',component: FormComponent},
    {path:'add', component:FormComponent},
    {path:'product/:id',component:DetailsComponent},
    {path:'products/:brand',component:ListBrandComponent}
]