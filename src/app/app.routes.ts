import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),

    },
    {
        path: 'productos',
        loadComponent: () => import('./pages/products/products.component'),
        children: [
            {   
                path: '',
                loadComponent: () => import('./pages/products/list-products/list-products.component')
            },
            {
                path: 'create',
                loadComponent: () => import('./pages/products/create-product/create-product.component')
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./pages/products/edit-product/edit-product.component')
            },
            {   
                path: '**',
                loadComponent: () => import('./pages/products/list-products/list-products.component')
            },
        ]

    },
    {
        path: 'tpv',
        loadComponent: () => import('./pages/tpv/tpv.component'),

    },
    {
        path: '404',
        loadComponent: () => import('./pages/404/404.component'),

    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'

    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'

    }
];
