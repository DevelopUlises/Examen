import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { ScriptLoaderService } from "../../../../../_services/script-loader.service";
import { Router } from "@angular/router";
import { GlobalDataService } from "../../../../../_services/globalData";
import { Helpers } from "../../../../../helpers";
import {User} from "../../../../../auth/_models";
import {UserService} from "../../../../../auth/_services";


declare let mApp: any;
declare let GMaps: any;


//declare let google: any;
@Component({
    selector: 'product-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {
    @Input() user: User;
    title: string;


    constructor(
        private router: Router,
        private usersService: UserService,
        ) { }

    ngOnInit() {

        if ( ! this.user.id) {
            this.title = "Creating User";
        } else {
            this.title = "Updating User " + this.user.first_name;
        }

    }

    ngAfterViewInit() {

    }

    save(paction) {

        if (this.user.id) {
            this.editUser();
        } else {
            this.createUser();
        }
    }


    createUser() {
        Helpers.setLoading(true);
        this.usersService.rcreate(this.user).then(()=>{
            Helpers.setLoading(false);
                this.router.navigate(['/users']);
        });
    }

    editUser() {
        Helpers.setLoading(true);
        this.usersService.rupdate(this.user).then(()=>{
            Helpers.setLoading(false);
                this.router.navigate(['/users']);
        });
    }
}
