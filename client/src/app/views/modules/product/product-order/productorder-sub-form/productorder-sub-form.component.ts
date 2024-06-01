import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ProductmaterialSubFormComponent } from '../../product-form/productmaterial-sub-form/productmaterial-sub-form.component';
import { AbstractSubFormComponent } from 'src/app/shared/ui-components/abstract-sub-form/abstract-sub-form.component';
import { Material } from 'src/app/entities/material';
import { ApiManager } from 'src/app/shared/api-manager';
import { MaterialService } from 'src/app/services/material.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/entities/product';
import { Productorder } from 'src/app/entities/productorder';
import { ProductService } from 'src/app/services/product.service';
import { Productinventory } from 'src/app/entities/productinventory';
import { ConfirmDialogComponent } from 'src/app/shared/views/confirm-dialog/confirm-dialog.component';
//import { Productorder } from 'src/app/entities/productorder';

@Component({
  selector: 'app-productorder-sub-form',
  templateUrl: './productorder-sub-form.component.html',
  styleUrls: ['./productorder-sub-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductorderSubFormComponent),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProductorderSubFormComponent),
      multi: true,
    }
  ]
})
export class ProductorderSubFormComponent extends AbstractSubFormComponent<Productorder>  implements OnInit {

  @Input()
  products: Product[] = [];

  hasValidations = false;
  public total =0;

qty: number;
proinventory: Productinventory[] = [];

  get thumbnailURL(): string{
    return ApiManager.getURL('/files/thumbnail/');
  }

  form = new FormGroup({
    id: new FormControl(null),
    product: new FormControl(),
    qty: new FormControl(),
  });

  get idField(): FormControl{
    return this.form.controls.id as FormControl;
  }

  get productField(): FormControl{
    return this.form.controls.product as FormControl;
  }

  get qtyField(): FormControl{
    return this.form.controls.qty as FormControl;
  }

  get isFormEmpty(): boolean{
    return this.isEmptyField(this.idField)
      &&   this.isEmptyField(this.productField)
      &&   this.isEmptyField(this.qtyField);
  }

  constructor(
    private productService: ProductService,
    protected dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  

  ngOnInit(): void {
    // this.loadData();
  }


  loadData():void{
    
    this.productService.getAllInventory().then((pinventory) => {
      this.proinventory = pinventory;
      this.checkqty(this.proinventory);
  
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });
  }

  setValidations(): void{
    this.hasValidations = true;
    this.productField.setValidators([Validators.required]);
    this.qtyField.setValidators([
      Validators.required,
      Validators.pattern('^([0-9]{1,10}([.][0-9]{1,3})?)$'),
      Validators.max(10000),
      Validators.min(2),
    ]);
  }

  removeValidations(): void{
    this.hasValidations = false;
    this.productField.clearValidators();
    this.qtyField.clearValidators();
  }

  fillForm(dataItem: Productorder): void {
    this.idField.patchValue(dataItem.id);
    this.productField.patchValue(dataItem.product.id);
    this.qtyField.patchValue(dataItem.qty);
  }

  resetForm(): void{
    this.form.reset();
    this.removeValidations();
  }

  // Operations related functions
  getDeleteConfirmMessage(orderproduct: Productorder): string {
    return 'Are you sure to remove \u201C ' + orderproduct.product.name  + ' \u201D from product list ?';
  }

  getUpdateConfirmMessage(orderproduct: Productorder): string {
    if (this.isFormEmpty){
      return 'Are you sure to update \u201C\u00A0' + orderproduct.product.name +  '\u00A0\u201D\u00A0?';
    }

    return 'Are you sure to update \u201C\u00A0' + orderproduct.product.name + '\u00A0\u201D and discard existing form data\u00A0?';
  }

  addData(): void{
    if (this.form.invalid) { return; }

    const dataItem: Productorder = new Productorder();
    dataItem.id = this.idField.value;

    for (const product of this.products){
      if (this.productField.value === product.id) {
        dataItem.product = product;
        break;
      }
    }

    dataItem.qty = this.qtyField.value;
    this.addToTop(dataItem);
    this.resetForm();
  }

  customValidations(): object {
    return null;
  }


  checkqty(pi:Productinventory[]):void{
      let num: number = this.qtyField.value;
      let pro: Product = new Product();
      let i: number=this.productField.value;
     
      if(pi.length>0){
        console.log(i);
        
        pi.forEach(I=>{
       if(I.product.id===i){
        this.qty = I.qty;
        pro = I.product;
       }
        });
      }


      if(num>this.qty){
        console.log("eeeee");
        
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '500px',
          data: {message: pro.name+  'qty is not enough' , title: 'Information', color: 'accent'}
        });
    
        dialogRef.afterClosed().subscribe( async result => {
          if (!result) { return; }
         this.qtyField.value.reset;
        });
      }
  }

}
