import { Component, OnInit } from '@angular/core';
import {AbstractComponent} from '../../shared/abstract-component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoggedUser} from '../../shared/logged-user';
import {UsecaseList} from '../../usecase-list';
import {DashboardService} from '../../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AbstractComponent implements OnInit {

  recentEmployeeCount = 0;
  recentMaterialCount = 0;
  recentSupplierCount = 0;

  public dashboardPrivilage  = {
    showEmployees: false,
    showSuppliers: false,
    showMaterials: false,
  };


  constructor(
    private matSnackBar: MatSnackBar,
    private dashboardService: DashboardService,
  ) {
    super();
  }

  ngOnInit(): void{
    this.loadData();
    this.refreshData();
  }

  async loadData(): Promise<any> {
    this.updatePrivileges();


    this.recentEmployeeCount = await this.dashboardService.getRecentEmployeeCount();
    this.recentSupplierCount = await this.dashboardService.getRecentSupplierCount();
    this.recentMaterialCount = await this.dashboardService.getRecentMaterialCount();
  }

  updatePrivileges(): any {

    this.dashboardPrivilage.showEmployees = LoggedUser.can(UsecaseList.SHOW_ALL_EMPLOYEES);
    this.dashboardPrivilage.showSuppliers = LoggedUser.can(UsecaseList.SHOW_ALL_SUPPLIERS);
    this.dashboardPrivilage.showMaterials = LoggedUser.can(UsecaseList.SHOW_ALL_MATERIALS);
  }

}
