import { Component, OnInit } from '@angular/core';

import { FranchiseService } from '../shared/franchise.service';

@Component({
    selector: 'franchises-list',
    templateUrl: './franchises-list.component.html',
    styleUrls: ['./franchises-list.component.scss']
})
export class FranchisesListComponent implements OnInit {

    private gridApi;
    rowData;

    defaultColDef = {
        resizable: true,
        cellStyle: { color: '#1a3469' }
    }

    columnDefs = [
        { headerName: "Name", field: "name" },
        { headerName: "Created", field: "created" },
        { headerName: "CreatedBy", field: "createdBy" },
        { headerName: "First Appearance", field: "firstAppearance" },
        { headerName: "Outline", field: "outlineText" },
        { headerName: "Games", field: "games" },
        { headerName: "Aliases", field: "aliases" }
    ]

    constructor(private franchiseService: FranchiseService) {

    }

    ngOnInit() {
        this.rowData = this.franchiseService.getFranchises();
        this.franchiseService.getFranchises()
            .subscribe((data: any) => {
                if (data && data.payload) {
                    this.rowData = data.payload;
                } else {
                    console.log("No data returned");
                }
            }
            );

    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.sizeToFit();
    }

    sizeToFit() {
        this.gridApi.sizeColumnsToFit();
    }
}
