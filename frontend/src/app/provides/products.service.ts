import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  api = 'http://localhost:3000/api/product';

  constructor(
    private http: HttpClient
  ) { }

  getAllProduct() {
    return this.http.get<Product[]>(this.api).pipe(map(products => {
        if(products) {
          return products;
        }
      },
      (error) => {
        console.log(error);
      }
    ));
  }

  getProductById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get<Product>(this.api+'/'+ id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getProductByName(name:string){
    const thingData ={name:name};
    return this.http.post<Product[]>(this.api+'/search',thingData).pipe(map(products => {
      if(products) {
        return products;
      }
    },
    (error) => {
      console.log(error);
    }
  ));
    
    
  }

  createNewProduct(product : Product) {
    return new Promise((resolve, reject) => {
      this.http.post(this.api, product).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyProduct(id: string , product: Product) {
    return new Promise((resolve, reject) => {
      this.http.put(this.api + '/' + id, product).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteProduct(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.api + '/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }



}

  

