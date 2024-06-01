// import { Component, OnInit } from '@angular/core';
// import {ResourceLink} from '../../../../shared/resource-link';
// import {FormControl, FormGroup, Validators} from '@angular/forms';
// import {MatSnackBar} from '@angular/material/snack-bar';
// import {Router} from '@angular/router';
// import {AbstractComponent} from '../../../../shared/abstract-component';
// import {LoggedUser} from '../../../../shared/logged-user';
// import {UsecaseList} from '../../../../usecase-list';
// import {PageRequest} from '../../../../shared/page-request';
// import {ViewChild} from '@angular/core';
// import {DateHelper} from '../../../../shared/date-helper';
// import {ProductmaterialSubFormComponent} from './productmaterial-sub-form/productmaterial-sub-form.component';
// import {Material, MaterialDataPage} from '../../../../entities/material';
// import {Supplier} from '../../../../entities/supplier';
// import {SupplierService} from '../../../../services/supplier.service';
// import {MaterialService} from '../../../../services/material.service';
// import {ProductService} from '../../../../services/product.service';
// import {Product} from '../../../../entities/product';
//
//
// @Component({
//   selector: 'app-product-form',
//   templateUrl: './product-form.component.html',
//   styleUrls: ['./product-form.component.scss']
// })
// export class ProductFormComponent extends AbstractComponent implements OnInit {
//   materials: Material[] = [];
//   // suppliers: Supplier[] = [];
//   @ViewChild(ProductmaterialSubFormComponent) productmaterialSubForm: ProductmaterialSubFormComponent;
//
//   form = new FormGroup({
//     doordered: new FormControl(null, [
//       Validators.required,
//     ]),
//     dorequired: new FormControl(null, [
//       Validators.required,
//     ]),
//     // supplier: new FormControl(null, [
//     //   Validators.required,
//     // ]),
//     productmaterials: new FormControl(),
//     description: new FormControl(null, [
//       Validators.minLength(null),
//       Validators.maxLength(5000),
//     ]),
//   });
//
//   get doorderedField(): FormControl{
//     return this.form.controls.doordered as FormControl;
//   }
//
//   get dorequiredField(): FormControl{
//     return this.form.controls.dorequired as FormControl;
//   }
//
//   // get supplierField(): FormControl{
//   //   return this.form.controls.supplier as FormControl;
//   // }
//
//   get productmaterialsField(): FormControl{
//     return this.form.controls.productmaterials as FormControl;
//   }
//
//   get descriptionField(): FormControl{
//     return this.form.controls.description as FormControl;
//   }
//
//   constructor(
//     // private supplierService: SupplierService,
//     private materialService: MaterialService,
//     private productService: ProductService,
//     private snackBar: MatSnackBar,
//     private router: Router
//   ) {
//     super();
//   }
//
//   ngOnInit(): void {
//     this.loadData();
//     this.refreshData();
//     this.loadMaterials();
//
//   }
//
// async loadData(): Promise<any>{
//
//     this.updatePrivileges();
//     if (!this.privilege.add) { return; }
//
//   //   this.supplierService.getAllBasic(new PageRequest()).then((supplierDataPage) => {
//   //     this.suppliers = supplierDataPage.content;
//   //   }).catch((e) => {
//   //     console.log(e);
//   //     this.snackBar.open('Something is wrong', null, {duration: 2000});
//   //   });
//   }
//
//   updatePrivileges(): any {
//     this.privilege.add = LoggedUser.can(UsecaseList.ADD_PRODUCT);
//     this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_PRODUCTS);
//     this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_PRODUCT_DETAILS);
//     this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_PRODUCT);
//     this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_PRODUCT);
//   }
//
//   async submit(): Promise<void> {
//     this.productmaterialSubForm.resetForm();
//     this.productmaterialsField.markAsDirty();
//     if (this.form.invalid) { return; }
//
//     const product: Product = new Product();
//     product.doordered = DateHelper.getDateAsString(this.doorderedField.value);
//     product.dorequired = DateHelper.getDateAsString(this.dorequiredField.value);
//     // product.supplier = this.supplierField.value;
//     product.productmaterialList = this.productmaterialsField.value;
//     product.description = this.descriptionField.value;
//     product.doreceived = null;
//     try{
//       const resourceLink: ResourceLink = await this.productService.add(product);
//       if (this.privilege.showOne) {
//         await this.router.navigateByUrl('/products/' + resourceLink.id);
//       } else {
//         this.form.reset();
//         this.snackBar.open('Successfully saved', null, {duration: 2000});
//       }
//     }catch (e) {
//       switch (e.status) {
//         case 401: break;
//         case 403: this.snackBar.open(e.error.message, null, {duration: 2000}); break;
//         case 400:
//           const msg = JSON.parse(e.error.message);
//           let knownError = false;
//           if (msg.doordered) { this.doorderedField.setErrors({server: msg.doordered}); knownError = true; }
//           if (msg.dorequired) { this.dorequiredField.setErrors({server: msg.dorequired}); knownError = true; }
//           // if (msg.supplier) { this.supplierField.setErrors({server: msg.supplier}); knownError = true; }
//           if (msg.productmaterialList) { this.productmaterialsField.setErrors({server: msg.productmaterialList}); knownError = true; }
//           if (msg.description) { this.descriptionField.setErrors({server: msg.description}); knownError = true; }
//           if (!knownError) {
//             this.snackBar.open('Validation Error', null, {duration: 2000});
//           }
//           break;
//         default:
//           this.snackBar.open('Something is wrong', null, {duration: 2000});
//       }
//     }
//
//   }
// //   loadMaterials(): void{
// //     if (this.supplierField.value !== '' && this.supplierField.value != null){
// //       this.materialService.getAllBySupplier(this.supplierField.value).then((materialDataPage) => {
// //         this.materials = materialDataPage;
// //       }).catch((e) => {
// //         console.log(e);
// //         this.snackBar.open('Something is wrong', null, {duration: 2000});
// //       });
// //     }
// // }
//   loadMaterials(): void {
//     this.materialService.getAllMaterials().then((materials) => {
//       this.materials = materials;
//     }).catch((error) => {
//       console.error('Error loading materials:', error);
//       this.snackBar.open('Something went wrong while loading materials', null, { duration: 2000 });
//     });
//   }
//
//
//   dateValidator(): Date {
//     return new Date();
//   }
// }

import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AbstractComponent } from '../../../../shared/abstract-component';
import { LoggedUser } from '../../../../shared/logged-user';
import { UsecaseList } from '../../../../usecase-list';
import { PageRequest } from '../../../../shared/page-request';
import { ProductmaterialSubFormComponent } from './productmaterial-sub-form/productmaterial-sub-form.component';
import { Material } from '../../../../entities/material';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../entities/product';
import {MaterialService} from '../../../../services/material.service';
import {ResourceLink} from '../../../../shared/resource-link';
import {DateHelper} from '../../../../shared/date-helper';
import {Materialtype} from '../../../../entities/materialtype';
import {Producttype} from '../../../../entities/producttype';
import {Productcategory} from '../../../../entities/productcategory';
import {MaterialtypeService} from '../../../../services/materialtype.service';
import {ProducttypeService} from '../../../../services/producttype.service';
import {ProductcategoryService} from '../../../../services/productcategory.service'; // Import MaterialService

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent extends AbstractComponent implements OnInit {
  producttypes: Producttype[] = [];
  productcategories: Productcategory[] = [];
  ProductList: Product[]=[];
  materials: Material[] = [];
  @ViewChild(ProductmaterialSubFormComponent) productmaterialSubForm: ProductmaterialSubFormComponent;

  form = new FormGroup({
    // doordered: new FormControl(null, [
    //
    // ]),
    // dorequired: new FormControl(null, [
    //
    // ]),
    producttype: new FormControl(null, [
      Validators.required,
    ]),
    productcategory: new FormControl(null, [
      Validators.required,
    ]),
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(null),
      Validators.maxLength(255),
    ]),
    price: new FormControl(null, [
      Validators.required,
      Validators.min(2),
      Validators.max(10000),
      Validators.pattern('^([0-9]{1,10}([.][0-9]{1,3})?)$'),
    ]),
    productmaterials: new FormControl(),
    description: new FormControl(null, [
      Validators.minLength(null),
      Validators.maxLength(5000),
    ]),
  });

  get nameField(): FormControl {
    return this.form.controls.name as FormControl;
  }
  get producttypeField(): FormControl{
    return this.form.controls.producttype as FormControl;
  }
  get productcategoryField(): FormControl{
    return this.form.controls.productcategory as FormControl;
  }
  get priceField(): FormControl {
    return this.form.controls.price as FormControl;
  }

  get productmaterialsField(): FormControl {
    return this.form.controls.productmaterials as FormControl;
  }

  get descriptionField(): FormControl {
    return this.form.controls.description as FormControl;
  }


  constructor(
    private producttypeService: ProducttypeService,
    private productcategoryService: ProductcategoryService,
    private productService: ProductService,
    private materialService: MaterialService, // Inject MaterialService here
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
    this.refreshData();
    console.log("ddd");
    if (this.materialService) {
      this.loadMaterials();
    } else {
      console.error('MaterialService is not initialized.');
    }
  }

  async loadData(): Promise<any> {
    this.updatePrivileges();
    if (!this.privilege.add) { return; }

    this.updatePrivileges();
    if (!this.privilege.add) { return; }

    this.producttypeService.getAll().then((producttypes) => {
      this.producttypes = producttypes;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
    
    this.productcategoryService.getAll().then((productcategories) => {
      this.productcategories = productcategories;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_PRODUCT);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_PRODUCTS);
//     this.privilege.add = LoggedUser.can(UsecaseList.ADD_PRODUCT_INVENTORY);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_PRODUCT_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_PRODUCT);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_PRODUCT);
  }

  async submit(): Promise<void> {
    this.productmaterialSubForm.resetForm();
    this.productmaterialsField.markAsDirty();
    if (this.form.invalid) { return; }

    const product: Product = new Product();

    product.productmaterialList = this.productmaterialsField.value;
    product.producttype = this.producttypeField.value;
    product.productcategory = this.productcategoryField.value;
    product.description = this.descriptionField.value;
    product.name = this.nameField.value;
    product.price = this.priceField.value;

    try {
      const resourceLink: ResourceLink = await this.productService.add(product);
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
          if (msg.producttype) { this.producttypeField.setErrors({server: msg.producttype}); knownError = true; }
          if (msg.productcategory) { this.productcategoryField.setErrors({server: msg.productcategory}); knownError = true; }
          if (msg.name) { this.nameField.setErrors({ server: msg.name }); knownError = true; }
          if (msg.price) { this.priceField.setErrors({ server: msg.price }); knownError = true; }
          if (msg.productmaterialList) { this.productmaterialsField.setErrors({ server: msg.productmaterialList }); knownError = true; }
          if (msg.description) { this.descriptionField.setErrors({ server: msg.description }); knownError = true; }
          if (!knownError) {
            this.snackBar.open('Validation Error', null, { duration: 2000 });
          }
          break;
        default:
          this.snackBar.open('Something is wrong', null, { duration: 2000 });
      }
    }
  }

  async loadMaterials(): Promise<void> {
    try {
      const materialDataPage = await this.materialService.getAllBasic(new PageRequest());
      this.materials = materialDataPage.content;
    } catch (e) {
      console.log(e);
      this.snackBar.open('Something is wrong', null, { duration: 2000 });
    }
  }
}
