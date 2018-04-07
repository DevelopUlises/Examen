import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import "rxjs/add/operator/map";


@Injectable()
export class AuthenticationService {
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http, ) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'X-CSRFToken': this.getCookie('csrftoken')
        });

        this.options = new RequestOptions({ headers: this.headers });
    }

    getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2)
            return parts.pop().split(";").shift();
    }


    login(email: string, password: string) {
        return this.http.post('/rest-auth/login/', JSON.stringify({ email: email, password: password }), this.options);
    }

    logout() {
        // remove user from local storage to log user out
        return this.http.get('/rest-auth/logout/ ', this.options);
    }



}