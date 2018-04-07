import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs/Rx";
import { GlobalDataService } from "../../_services/globalData";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _userService: UserService, private globaldata: GlobalDataService, ) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this._userService.verify().map(
            data => {
                if (data.success) {
                    this.globaldata["currentUser"] = data.user;
                    return true;
                } else {
                    this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    return false;
                }
            },
            error => {
                // error when verify so redirect to login page with the return url
                this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            });
    }
}