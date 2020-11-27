import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/provides/products.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {

  public product: Product;
  public productForm: FormGroup;
  public errorMessage: string;
  public loading : boolean;
  public id : string ;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {

    this.loading = true;
    this.id = this.route.snapshot.params['id'];
    await this.productsService.getProductById(this.id).then(
      (product: Product) => {
        this.loading = false;
        this.product = product;
      }
    );
    this.initForm();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      nom: [this.product.nom, Validators.required],
      prix: [this.product.prix, Validators.required],
      quantite: [this.product.quantite, Validators.required],
    });
  }

  onSubmit() {

    this.loading = true;
    const formContactValue = this.productForm.value ;

    let product = new Product(formContactValue.nom,formContactValue.prix,formContactValue.quantite);
    console.log(product);
    this.productsService.modifyProduct(this.id,product).then(() => {

      this.snackbar.open('Produit modifié avec succès', 'terminer maintenant', {
        duration: 3000,
        panelClass: 'snackbar-success',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.loading = false;
      this.router.navigate(['/home']);

    })
      .catch(
        (error) => {
          this.loading = false;
          this.errorMessage = error.message;
        }
      );
  }


}
