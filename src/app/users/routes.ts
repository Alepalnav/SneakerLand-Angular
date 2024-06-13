import { Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { OrdersUserComponent } from "./orders-user/orders-user.component";
import { authRoleTsGuard } from "../guards/auth-role.ts.guard";
import { jwtGuard } from "../guards/jwt.guard";

export const routes: Routes = [
    {path:'list',component:UserListComponent,canMatch:[authRoleTsGuard]},
    {path:'orders',component:OrdersUserComponent,canMatch:[jwtGuard]}
]