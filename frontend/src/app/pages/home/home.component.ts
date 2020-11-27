import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/provides/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products : Product[]=[];
  public loading: boolean;
  public activeProducts :Product[]=[];

  constructor(
    private productsService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.productsService.getAllProduct().subscribe( (products : Product[])=>{
      this.activeProducts=products;
      this.products = this.activeProducts;
      this.loading = false ;
    } )
  }

  chercher(name){
    console.log(name);
    this.loading = true;
    if(name!=""){
      this.productsService.getProductByName(name).subscribe( (products : Product[])=>{
        this.products = products;
        this.loading = false ;
      } );
    }else{
      this.products=this.activeProducts;
      this.loading = false;
    }
  }

  onProductClicked(id){
    this.router.navigate(['/produit/'+id]);
  }

}
