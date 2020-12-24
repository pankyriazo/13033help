import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'main',
        loadChildren: () => import('./pages/main/main.module').then((m) => m.MainPageModule),
    },
    {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesPageModule),
    },
    {
        path: 'information',
        loadChildren: () => import('./pages/information/information.module').then((m) => m.InformationPageModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
