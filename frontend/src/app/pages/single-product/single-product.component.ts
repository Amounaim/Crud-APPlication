import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/provides/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  public product: Product;
  public loading: boolean;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    let id = this.route.snapshot.params['id'];
    this.productsService.getProductById(id).then(
      (product: Product) => {
        this.loading = false;
        this.product = product;
        console.log(product);
      }
    );
  }

  onGoBack() {
    this.router.navigate(['/home']);
  } //

  onModify() {
    this.router.navigate(['/modifier-produit/' + this.product._id]);
  }

  onDelete() {
    this.loading = true;
    this.productsService.deleteProduct(this.product._id).then(() => {
      this.loading = false;
      this.router.navigate(['/home']);
      this.snackbar.open('Le produit est supprimé avec succès', 'terminer maintenant', {
        duration: 3000,
        panelClass: 'snackbar-success',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    });
  }


}
