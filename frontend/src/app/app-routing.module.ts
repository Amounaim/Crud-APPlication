import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { HomeComponent } from './pages/home/home.component';
import { ModifyProductComponent } from './pages/modify-product/modify-product.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'ajouter', component: AddProductComponent },
  { path: 'produit/:id', component: SingleProductComponent },
  { path: 'modifier-produit/:id', component: ModifyProductComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
