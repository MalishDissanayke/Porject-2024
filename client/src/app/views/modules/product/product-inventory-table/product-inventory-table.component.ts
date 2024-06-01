import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Productinventory } from 'src/app/entities/productinventory';
import { ProductService } from 'src/app/services/product.service';
import { AbstractComponent } from 'src/app/shared/abstract-component';
import { LoggedUser } from 'src/app/shared/logged-user';
import { UsecaseList } from 'src/app/usecase-list';

@Component({
  selector: 'app-product-inventory-table',
  templateUrl: './product-inventory-table.component.html',
  styleUrls: ['./product-inventory-table.component.scss']
})
export class ProductInventoryTableComponent extends AbstractComponent implements OnInit {

  constructor(
    private productService: ProductService,
    protected dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { super()}
  proinventory:Productinventory[] = [];
  displayedColumns: string[] = [];
  pageSize = 5;
  pageIndex = 0;

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){

    this.updatePrivileges() ;
    
    this.productService.getAllInventory().then((pinventory) => {
      this.proinventory = pinventory;
      
  
    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
    });

    this.setDisplayedColumns();
  }

  updatePrivileges(): any {
    this.privilege.add = LoggedUser.can(UsecaseList.ADD_PRODUCT);
    this.privilege.showAll = LoggedUser.can(UsecaseList.SHOW_ALL_PRODUCTS);
//     this.privilege.showAll = LoggedUser.can(UsecaseList.ADD_PRODUCT_INVENTORY);
    this.privilege.showOne = LoggedUser.can(UsecaseList.SHOW_PRODUCT_DETAILS);
    this.privilege.delete = LoggedUser.can(UsecaseList.DELETE_PRODUCT);
    this.privilege.update = LoggedUser.can(UsecaseList.UPDATE_PRODUCT);
  }

  setDisplayedColumns(): void{
    this.displayedColumns = ['code', 'product', 'qty'];

    if (this.privilege.delete) { this.displayedColumns.push('delete-col'); }
    if (this.privilege.update) { this.displayedColumns.push('update-col'); }
    if (this.privilege.showOne) { this.displayedColumns.push('more-col'); }
  }

}
