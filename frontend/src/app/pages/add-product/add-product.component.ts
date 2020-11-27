import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/provides/products.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public productForm: FormGroup;
  public errorMessage: string;
  public loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      nom: [null, Validators.required],
      prix: [0, Validators.required],
      quantite: [0, Validators.required],
    });
  }

  onSubmit() {

    this.loading = true;
    const formContactValue = this.productForm.value ;

    let product = new Product(formContactValue.nom,formContactValue.prix,formContactValue.quantite);
    console.log(product);
    this.productsService.createNewProduct(product).then(() => {

      this.snackbar.open('Produit ajouté avec succès', 'terminer maintenant', {
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
