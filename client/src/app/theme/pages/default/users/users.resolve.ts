import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import {UserService} from "../../../../auth/_services";




@Injectable()
export class UsersResolve implements Resolve<any> {
    constructor(private usersService: UserService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.usersService.rgetAll().then(users => {
            if (users) {
                return users;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        });
    }
}

@Injectable()
export class UserResolve implements Resolve<any> {

    constructor(private usersService: UserService) { }

    resolve(route: ActivatedRouteSnapshot){
        let id = +route.params['id'];
        return this.usersService.rgetById(id).then( user => {
            if (user) {
                return user;
            } else {
                return false;
            }
        });
    }
}

