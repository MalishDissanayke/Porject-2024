import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {ResourceLink} from '../../../../shared/resource-link';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {PageRequest} from '../../../../shared/page-request';
import {ViewChild} from '@angular/core';
import {DateHelper} from '../../../../shared/date-helper';
import {ProductmaterialUpdateSubFormComponent} from './productmaterial-update-sub-form/productmaterial-update-sub-form.component';
import { Productstatus } from 'src/app/entities/productstatus';
import {Supplier} from "../../../../entities/supplier";
import {Product} from "../../../../entities/product";
import {SupplierService} from "../../../../services/supplier.service";
import {ProductstatusService} from "../../../../services/productstatus.service";
import {ProductService} from "../../../../services/product.service";
import { Producttype } from 'src/app/entities/producttype';
import { Productcategory } from 'src/app/entities/productcategory';
import { ProducttypeService } from 'src/app/services/producttype.service';
import { ProductcategoryService } from 'src/app/services/productcategory.service';

@Component({
  selector: 'app-product-update-form',
  templateUrl: './product-update-form.component.html',
  styleUrls: ['./product-update-form.component.scss']
})
export class ProductUpdateFormComponent extends AbstractComponent implements OnInit {

  selectedId: number;
  product: Product;
  producttypes: Producttype[] = [];
  productcategories: Productcategory[] = [];

  suppliers: Supplier[] = [];
  @ViewChild(ProductmaterialUpdateSubFormComponent) productmaterialUpdateSubForm: ProductmaterialUpdateSubFormComponent;
  productstatuses: Productstatus[] = [];

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
    private supplierService: SupplierService,
    private productstatusService: ProductstatusService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private producttypeService: ProducttypeService,
    private productcategoryService: ProductcategoryService,
  ) {
    super();
  }

  ngOnInit(): void {

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


    this.route.paramMap.subscribe( async (params) => {
      this.selectedId =  + params.get('id');
      await this.loadData();
      this.refreshData();
    });
  }

async loadData(): Promise<any>{

    this.updatePrivileges();
    if (!this.privilege.update) { return; }

    this.supplierService.getAllBasic(new PageRequest()).then((supplierDataPage) => {
      this.suppliers = supplierDataPage.content;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
    this.productstatusService.getAll().then((productstatuses) => {
      this.productstatuses = productstatuses;
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
    this.product = await this.productService.get(this.selectedId);


  

    this.setValues();
   
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_PRODUCT);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_PRODUCTS);
//     this.privilege.showAll = LoggedUser.can(UsecaseList.ADD_PRODUCT_INVENTORY);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_PRODUCT_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_PRODUCT);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_PRODUCT);
  }

  discardChanges(): void{
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.setValues();
  }

  setValues(): void{
      if (this.nameField.pristine) {
      this.nameField.setValue(this.product.name);
    }
    if (this.producttypeField.pristine) {
      this.producttypes.forEach(p =>{
if(p.id === this.product.producttype.id){
  this.producttypeField.setValue(p.id);
}
      });
    }

    if (this.productcategoryField.pristine) {
      this.productcategories.forEach(c =>{
if(c.id === this.product.productcategory.id){
  this.productcategoryField.setValue(c.id);
}
      });
    }

    // if (this.productcategoryField.pristine) {
    //   this.productcategoryField.setValue(this.product.productcategory.id);
    // }
    if (this.priceField.pristine) {
      this.priceField.setValue(this.product.price);
    }
    if (this.descriptionField.pristine) {
      this.descriptionField.setValue(this.product.description);
    }
    if (this.productmaterialsField.pristine) {
      this.productmaterialsField.setValue(this.product.productmaterialList);
    }
}

  async submit(): Promise<void> {
    this.productmaterialUpdateSubForm.resetForm();
    this.productmaterialsField.markAsDirty();
    if (this.form.invalid) { return; }

    const newproduct: Product = new Product();

    newproduct.name = this.nameField.value;
    newproduct.productmaterialList = this.productmaterialsField.value;
    newproduct.price = this.priceField.value;
    newproduct.description = this.descriptionField.value;
    newproduct.productcategory = this.productcategoryField.value;
    newproduct.producttype = this.producttypeField.value;
    try{
      const resourceLink: ResourceLink = await this.productService.update(this.selectedId, newproduct);
      if (this.privilege.showOne) {
        await this.router.navigateByUrl('/products/' + resourceLink.id);
      } else {
        await this.router.navigateByUrl('/products');
      }
    }catch (e) {
      switch (e.status) {
        case 401: break;
        case 403: this.snackBar.open(e.error.message, null, {duration: 2000}); break;
        case 400:
          const msg = JSON.parse(e.error.message);
          let knownError = false;

          if (msg.name) { this.nameField.setErrors({server: msg.supplier}); knownError = true; }
          if (msg.productmaterialList) { this.productmaterialsField.setErrors({server: msg.productmaterialList}); knownError = true; }
          if (msg.producttype) { this.producttypeField.setErrors({server: msg.productstatus}); knownError = true; }
          if (msg.description) { this.descriptionField.setErrors({server: msg.description}); knownError = true; }
          if (!knownError) {
            this.snackBar.open('Validation Error', null, {duration: 2000});
          }
          break;
        default:
          this.snackBar.open('Something is wrong', null, {duration: 2000});
      }
    }

  }
}
