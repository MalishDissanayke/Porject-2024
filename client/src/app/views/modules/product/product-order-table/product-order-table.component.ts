import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/entities/order';
import { ProductDataPage } from 'src/app/entities/order';
import { ProductService } from 'src/app/services/product.service';
import { AbstractComponent } from 'src/app/shared/abstract-component';
import { LoggedUser } from 'src/app/shared/logged-user';
import { PageRequest } from 'src/app/shared/page-request';
import { DeleteConfirmDialogComponent } from 'src/app/shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import { UsecaseList } from 'src/app/usecase-list';

@Component({
  selector: 'app-product-order-table',
  templateUrl: './product-order-table.component.html',
  styleUrls: ['./product-order-table.component.scss']
})
export class ProductOrderTableComponent extends AbstractComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  productDataPage: ProductDataPage;
  displayedColumns: string[] = [];
  pageSize = 5;
  pageIndex = 0;
  codeField = new FormControl();
  public orderList: Order[]= [];

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.refreshData();
  }

  async loadData(): Promise<any> {
    this.updatePrivileges();

    if (!this.privilege.showAll) { return; }

    this.setDisplayedColumns();

    const pageRequest = new PageRequest();
    pageRequest.pageIndex  = this.pageIndex;
    pageRequest.pageSize  = this.pageSize;

    pageRequest.addSearchCriteria('code', this.codeField.value);
    // pageRequest.addSearchCriteria('supplier', this.supplierField.value);

    // this.supplierService.getAllBasic(new PageRequest()).then((supplierDataPage) => {
    //   this.suppliers = supplierDataPage.content;
    // }).catch((e) => {
    //   console.log(e);
    //   this.snackBar.open('Something is wrong', null, {duration: 2000});
    // });


    //   this.productService.getAllOdd(pageRequest).then((page: ProductDataPage) => {
    //     this.productDataPage = page;
    //     console.log(this.productDataPage);

    // }).catch( e => {
    //   console.log(e);
    //   this.snackBar.open('Something is wrong', null, {duration: 2000});
    // });


    this.productService.getAllOrders().then((pinventory) => {
      this.orderList = pinventory;
      console.log("dgfsfdsad");

      console.log(this.orderList);
      // this.productDataPage.totalElements = pinventory.length;


    }).catch((e) => {
      console.log(e);
      this.snackBar.open('Something is wrong', null, {duration: 2000});
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

  setDisplayedColumns(): void{
    this.displayedColumns = ['creator', 'orderdate', 'arrivaldate', 'price', 'product'];

    if (this.privilege.delete) { this.displayedColumns.push('delete-col'); }
    if (this.privilege.update) { this.displayedColumns.push('update-col'); }
    if (this.privilege.showOne) { this.displayedColumns.push('more-col'); }
  }

  listProducts(order) {
    let products = '';
    if (order && order.productorder) {
      order.productorder.forEach(e => {
        products = products + e.product.name + ', ';
      });
    }
    return products;
  }

  async delete(order: Order): Promise<void>{
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      data: {message: "Confirm"}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }
      try {
        await this.productService.deleteorder(order.id);
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
      this.loadData();
    });
  }

}
