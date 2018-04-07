import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { GlobalDataService } from "../../../_services/globalData";

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {

    constructor(public globaldata: GlobalDataService) {

    }
    ngOnInit() {

    }
    ngAfterViewInit() {

        mLayout.initAside();

    }

}