
import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/entities/product';
import { ProductService } from 'src/app/services/product.service';
import {ResourceLink} from '../../../../shared/resource-link';
import { AbstractComponent } from 'src/app/shared/abstract-component';
import { Router } from '@angular/router';
import { Productinventory } from 'src/app/entities/productinventory';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/views/confirm-dialog/confirm-dialog.component';
import { UsecaseList } from 'src/app/usecase-list';
import { LoggedUser } from 'src/app/shared/logged-user';


@Component({
  selector: 'app-product-inventory',
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.scss']
})
export class ProductInventoryComponent extends AbstractComponent implements OnInit {
  

  public productList: Product[]=[];
  //productinventory: Productinventory;
  searchText = '';
   
  product: Product;
   form = new FormGroup({

    productName: new FormControl(null, [
      Validators.required,
      Validators.minLength(null),
      Validators.maxLength(255),
    ]),
    quantity: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      
    ]),
    date: new FormControl(null, [
      Validators.required,
    ])

    // searchText: new FormControl(null, [])

  });
  privilege: any;
 
  get filteredItems() {
    if (!this.searchText) {
      return this.productList;
    }
    const searchTextLower = this.searchText.toLowerCase();
    return this.productList.filter(item => item.name.toLowerCase().includes(searchTextLower));
  }

get productNameField(): FormControl {
    return this.form.controls.productName as FormControl;
  }

get quantityField(): FormControl {
    return this.form.controls.quantity as FormControl;
  }
get dateField(): FormControl {
    return this.form.controls.date as FormControl;
  }

  

    constructor(
    private productService: ProductService,
    //private materialService: MaterialService, // Inject MaterialService here
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
   
    ){
      super();
    }

    ngOnInit(): void {
    this.loadData();
    console.log("rrr");
    }
    async submit(): Promise<void> {
      let productinventory:Productinventory = new Productinventory();
     
      productinventory.product = this.productNameField.value;
      productinventory.qty = this.quantityField.value;
      productinventory.tocreation = this.dateField.value;
      // product.productmaterialList.array.forEach(element => {
      //   let id = element.material.id;
      //   let qty = element.material.qty;
      //   let f = qty*qun;
      // });

      try {
        const resourceLink: ResourceLink = await this.productService.addInventory(productinventory);
        if (this.privilege.showOne) {
          await this.router.navigateByUrl('/products/' + resourceLink.id);
        } else {
          this.form.reset();
          this.snackBar.open('Successfully saved', null, { duration: 2000 });
        }
      } catch (e) {
        switch (e.status) {
          case 401: break;
          case 403: this.snackBar.open(e.error.message, null, { duration: 2000 }); break;
          case 400:
            const msg = JSON.parse(e.error.message);
            let knownError = false;
            if (msg.producttype) { this.productNameField.setErrors({server: msg.producttype}); knownError = true; }
            if (msg.productcategory) { this.quantityField.setErrors({server: msg.productcategory}); knownError = true; }
            if (!knownError) {
              this.snackBar.open('Validation Error', null, { duration: 2000 });
            }
            break;
          default:
            this.snackBar.open('Something is wrong', null, { duration: 2000 });
        }
      }


    };

    async loadData(): Promise<any> {

      this.updatePrivileges() ;
      
      this.productService.getAllProcuts().then((productLists) => {
        this.productList = productLists;
        console.log(this.productList);
        
      }).catch((e) => {
        console.log(e);
        this.snackBar.open('Something is wrong', null, {duration: 2000});
      });
    }

    public async  checkValidation(): Promise<any>{
      console.log("here");
      
       let val: number = this.quantityField.value;
      let checkProduct: Product = this.productNameField.value;
      checkProduct.productmaterialList.forEach(m =>{
        if(m.qty*val > m.material.qty){
          console.log(m.material.name+  'qty is not enough');
          // return  m.material.name+  'qty is not enough';

          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '500px',
            data: {message: m.material.name+  'qty is not enough' , title: 'Information', color: 'accent'}
          });
      
          dialogRef.afterClosed().subscribe( async result => {
            if (!result) { return; }
           this.quantityField.value.reset;
          });
          
        }

      });

    }

    updatePrivileges(): any {
      this.privilege.add = LoggedUser.can(UsecaseList.ADD_PRODUCT);
      this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_PRODUCTS);
  //     this.privilege.showAll = LoggedUser.can(UsecaseList.ADD_PRODUCT_INVENTORY);
      this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_PRODUCT_DETAILS);
      this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_PRODUCT);
      this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_PRODUCT);
    }
  
}