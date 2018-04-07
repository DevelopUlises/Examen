import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../auth/_services/authentication.service";
import { Helpers } from '../../../helpers';
import { GlobalDataService } from "../../../_services/globalData";

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    user;

    constructor(private _authService: AuthenticationService,
        private _router: Router,
        public globaldata: GlobalDataService,
    ) { }
    //constructor()  {}
    ngOnInit() {
        this.user = this.globaldata["currentUser"];

    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }


    logout() {
        this._authService.logout().subscribe(
            data => {
                this.globaldata["currentUser"] = {};
                this._router.navigate(['/login']);
            },
            error => {
                console.log(error);
            });

    }


}