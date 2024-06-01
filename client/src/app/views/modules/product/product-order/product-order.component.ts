import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/entities/product';
import { ProductorderSubFormComponent } from './productorder-sub-form/productorder-sub-form.component';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/entities/role';
import { User } from 'src/app/entities/user';
import { Order } from 'src/app/entities/order';
import { AbstractComponent } from 'src/app/shared/abstract-component';
import { ResourceLink } from 'src/app/shared/resource-link';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedUser } from 'src/app/shared/logged-user';
import { UsecaseList } from 'src/app/usecase-list';
import { Productorder } from 'src/app/entities/productorder';
import { DeleteConfirmDialogComponent } from 'src/app/shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-product-order',
    templateUrl: './product-order.component.html',
    styleUrls: ['./product-order.component.scss']
  })

  export class ProductOrderComponent extends AbstractComponent implements OnInit {
  

    public products: Product[]=[];
    @ViewChild(ProductorderSubFormComponent) productorderSubFormComponent: ProductorderSubFormComponent;
    // materials: Material[] = [];
    // form = new FormGroup({

    //   productName: new FormControl(null, [
    //     Validators.required,
    //     Validators.minLength(null),
    //     Validators.maxLength(255),
    //   ]),
    //   orderdate: new FormControl(null, [
    //     Validators.required,
       
        
    //   ]),
    //   arivaldate: new FormControl(null, [
    //     Validators.required,
    //   ]),

    //   // productorder: new FormControl(),
  
    // });
    amount1: number = 0;
    role: Role;
    userList:User[];
    selectedId: number;
    update: boolean = false;
    constructor(
      private productService: ProductService,
      private roleService: RoleService,
      private snackBar: MatSnackBar,
      private router: Router,
      private route: ActivatedRoute,
      private dialog: MatDialog,
    ){
      super();
    }

    form = new FormGroup({

      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(null),
        Validators.maxLength(255),
      ]),
      orderdate: new FormControl(null, [
        Validators.required,
      ]),
      arrivaldate: new FormControl(null, [
        Validators.required,
      ]),

      orderproducts: new FormControl(),

      amount:new FormControl(null, [
        Validators.required,
      ]),
  
    });

    ngOnInit(): void {
      this.update = false;
      this.route.paramMap.subscribe( async (params) => {
        this.selectedId =  + params.get('id');
        });

this.loadData();
    }

    async loadData(): Promise<any> {

      if(this.selectedId){
        this.update = true;
       this.setValue();
      }
      this.updatePrivileges() ;

      this.productService.getAllProcuts().then((productLists) => {
        this.products = productLists;
        console.log(this.products);
    
      }).catch((e) => {
        console.log(e);
        this.snackBar.open('Something is wrong', null, {duration: 2000});
      });


      this.roleService.getByName().then((roles) => {
        this.role = roles;
        console.log(this.role);
       this.userList = this.role.userList;
        
      }).catch((e) => {
        console.log(e);
        this.snackBar.open('Something is wrong', null, {duration: 2000});
      });
    }
    

    get userNameField(): FormControl {
      return this.form.controls.userName as FormControl;
    }
  
  get orderdateField(): FormControl {
      return this.form.controls.orderdate as FormControl;
    }
  get arrivaldateField(): FormControl {
      return this.form.controls.arrivaldate as FormControl;
    }
    get orderproductsField(): FormControl {
      return this.form.controls.orderproducts as FormControl;
    }
    get amountField(): FormControl {
      return this.form.controls.amount as FormControl;
    }
    

    async submit(): Promise<void> {

    let order: Order = new Order();

    order.creator = this.userNameField.value;
    order.orderdate = this.orderdateField.value;
    order.arrivaldate = this.arrivaldateField.value;
    order.productorder=this.orderproductsField.value;
    order.price=this.amountField.value;

    console.log(order);

    if(this.update){

      try {
        const resourceLink: ResourceLink = await this.productService.updateorder(this.selectedId,order);
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
            if (msg.userName) { this.userNameField.setErrors({server: msg.userName}); knownError = true; }
            if (msg.orderproducts) { this.orderproductsField.setErrors({server: msg.orderproduct}); knownError = true; }
            if (msg.arrivaldate) { this.arrivaldateField.setErrors({ server: msg.arivaldate }); knownError = true; }
            if (msg.amount) { this.amountField.setErrors({ server: msg.amount }); knownError = true; }
            if (msg.orderproductList) { this.orderproductsField.setErrors({ server: msg.orderproductList }); knownError = true; }
            if (!knownError) {
              this.snackBar.open('Validation Error', null, { duration: 2000 });
            }
            break;
          default:
            this.snackBar.open('Something is wrong', null, { duration: 2000 });
        }
      }

    } else {

   try {
      const resourceLink: ResourceLink = await this.productService.addOrder(order);
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
          if (msg.userName) { this.userNameField.setErrors({server: msg.userName}); knownError = true; }
          if (msg.orderproducts) { this.orderproductsField.setErrors({server: msg.orderproduct}); knownError = true; }
          if (msg.arrivaldate) { this.arrivaldateField.setErrors({ server: msg.arivaldate }); knownError = true; }
          if (msg.amount) { this.amountField.setErrors({ server: msg.amount }); knownError = true; }
          if (msg.orderproductList) { this.orderproductsField.setErrors({ server: msg.orderproductList }); knownError = true; }
          if (!knownError) {
            this.snackBar.open('Validation Error', null, { duration: 2000 });
          }
          break;
        default:
          this.snackBar.open('Something is wrong', null, { duration: 2000 });
      }
    }
    
    }
    
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_PRODUCT);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_PRODUCTS);
//     this.privilege.add = LoggedUser.can(UsecaseList.ADD_PRODUCT_INVENTORY);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_PRODUCT_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_PRODUCT);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_PRODUCT);
  }

  setAmount(){
    
    let porder : Productorder[];
    porder = this.orderproductsField.value;
    porder.forEach(e=>{
this.amount1= this.amount1+(e.product.price*e.qty);
    });

    this.amountField.setValue(this.amount1);
  }

async setValue(){
    let order:Order = new Order();
    let user: User  = new User();

    order = await this.productService.getorder(this.selectedId);
    // 
    this.arrivaldateField.setValue(order.arrivaldate);
    this.orderdateField.setValue(order.orderdate);
    this.amountField.setValue(order.price);
    this.orderproductsField.setValue(order.productorder);
    this.userNameField.setValue(order.creator);
   
    
  }
}