import { Routes } from "@angular/router";
import { ListProductsComponent } from "./list-products/list-products.component";
import { FormComponent } from "./form/form.component";
import { DetailsComponent } from "./details/details.component";
import { ListBrandComponent } from "./list-brand/list-brand.component";
import { authRoleTsGuard } from "../guards/auth-role.ts.guard";
import { CartComponent } from "./cart/cart.component";
import { jwtGuard } from "../guards/jwt.guard";

export const routes: Routes = [
    {path: '', component: ListProductsComponent},
    {path: 'edit/:id',component: FormComponent,canMatch:[authRoleTsGuard]},
    {path:'add', component:FormComponent,canMatch:[authRoleTsGuard]},
    {path:'product/:id',component:DetailsComponent},
    {path:'products/:brand',component:ListBrandComponent},
    {path:'cart',component:CartComponent,canMatch:[jwtGuard]}
]