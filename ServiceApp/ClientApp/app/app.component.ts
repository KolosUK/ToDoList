import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Product } from './product';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [DataService]
})
export class AppComponent implements OnInit {
    
    product: Product = new Product();   
    products: Product[];                
    tableMode: boolean = true; 
    validName: boolean = false;
    validCompany: boolean = false;
    validPrice: boolean = false;
    valid: boolean = false;
  

    constructor(private dataService: DataService) { }

    ngOnInit() {
        debugger;
        this.loadProducts();    
    }
    loadProducts() {
        this.dataService.getProducts()
            .subscribe((data: Product[]) => this.products = data);
    }
    save() {
        debugger;
        if (this.product.id == null) {
          this.dataService.createProduct(this.product)
                .subscribe((data: Product) => this.products.push(data));
        } else {
            this.dataService.updateProduct(this.product)
                .subscribe(data => this.loadProducts());
        }
        this.cancel();
    }
    editProduct(p: Product) {
        this.product = p;
        this.validCompany = true;
        this.validPrice = true;
        this.validName = true;
        
    }

    saveEdit(prod: Product) {
        if (prod.price >= 0 &&
            prod.price < 100000) {
            this.validPrice = true;
        }
        else {
            this.validPrice = false;
        }
      if (prod.name.length >= 3 &&
            prod.name.length < 100) {
            this.validName = true;
        } else {
            this.validName = false;
        }
        if (prod.company.length >= 3 &&
            prod.company.length < 100) {
            this.validCompany = true;
        } 
        else {
            this.validCompany = false;
        }
        if (this.validPrice && this.validCompany && this.validName) {
            this.save();
        } 
        
    }

    cancel() {
        this.product = new Product();
        this.tableMode = true;
    }
    delete(p: Product) {
        this.dataService.deleteProduct(p.id)
            .subscribe(data => this.loadProducts());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }

    onSubmit(form: NgForm) {
        this.product.company = form.value.company;
        this.product.name = form.value.model;
        this.product.price = form.value.price;
        if (form.valid) {
            this.save();
        }
       
    }
}