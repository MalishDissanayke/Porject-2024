import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageRequest} from '../../../../shared/page-request';
import {LoggedUser} from '../../../../shared/logged-user';
import {UsecaseList} from '../../../../usecase-list';
import {DeleteConfirmDialogComponent} from '../../../../shared/views/delete-confirm-dialog/delete-confirm-dialog.component';
import {AbstractComponent} from '../../../../shared/abstract-component';
import {Product, ProductDataPage} from "../../../../entities/product";
import {Supplier} from "../../../../entities/supplier";
import {SupplierService} from "../../../../services/supplier.service";
import {ProductService} from "../../../../services/product.service";


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent extends AbstractComponent implements OnInit {

  productDataPage: ProductDataPage;
  displayedColumns: string[] = [];
  pageSize = 5;
  pageIndex = 0;

  suppliers: Supplier[] = [];

  codeField = new FormControl();
  supplierField = new FormControl();
  products: Product[];

  constructor(
    private supplierService: SupplierService,
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super();
  }

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

    this.productService.getAll(pageRequest).then((page: ProductDataPage) => {
      this.productDataPage = page;
      console.log(this.productDataPage);
      
    }).catch( e => {
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
    this.displayedColumns = ['code', 'doordered', 'dorequired', 'supplier'];

    if (this.privilege.delete) { this.displayedColumns.push('delete-col'); }
    if (this.privilege.update) { this.displayedColumns.push('update-col'); }
    if (this.privilege.showOne) { this.displayedColumns.push('more-col'); }
  }

  paginate(e): void{
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadData();
  }

  async delete(product: Product): Promise<void>{
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '300px',
      data: {message: product.code}
    });

    dialogRef.afterClosed().subscribe( async result => {
      if (!result) { return; }
      try {
        await this.productService.delete(product.id);
      }catch (e) {
        this.snackBar.open(e.error.message, null, {duration: 4000});
      }
      this.loadData();
    });
  }
}
