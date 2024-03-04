import { Routes } from '@angular/router';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { DetailsComponent } from './products/details/details.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './products/form/form.component';
import { ErrorComponent } from './error/error.component';
import { authRoleTsGuard } from './guards/auth-role.ts.guard';

export const routes: Routes = [

    // {path:'', component: IndexComponent},
    // {path:'products', component: ListProductsComponent
    // // ,
    //     // children: [
    //     //     {path: ':id', component: DetailsComponent},
    //     //     {path: 'edit/:id', component: FormComponent},
    //     //     {path: 'add', component: FormComponent},
    //     // ]
    // }
    // ,
    // {path: 'product/:id', component: DetailsComponent},
    // {path: 'product/edit/:id', component: FormComponent},
    // {path: 'product/add', component: FormComponent}

    {path:'',component: IndexComponent},
    {path: 'products',
    loadChildren: () => import('./products/routes').then(mod => mod.routes),
    },
    {path: 'auth',
    loadChildren: () => import('./auth/routes').then(mod => mod.routes),
    },
    {path: 'users',
    loadChildren: () => import('./users/routes').then(mod => mod.routes),
    },
    {path:'**',component: ErrorComponent}

];
