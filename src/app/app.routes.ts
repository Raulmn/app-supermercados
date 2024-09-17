import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component'),

    },
    {
        path: 'productos',
        loadComponent: () => import('./pages/products/products.component'),
        children: [
            {   
                path: '',
                title: 'Productos',
                loadComponent: () => import('./pages/products/list-products/list-products.component')
            },
            {
                path: 'nuevo',
                title: 'Crear Producto',
                loadComponent: () => import('./pages/products/create-product/create-product.component')
            },
            {
                path: 'editar/:id',
                title: 'Editar Producto',
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
        title: 'Terminal Punto de Venta',
        loadComponent: () => import('./pages/tpv/tpv.component'),

    },
    {
        path: '404',
        title: '404 Page Not Found',
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
