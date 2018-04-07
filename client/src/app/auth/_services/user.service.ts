import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import { User } from "../_models/index";

@Injectable()
export class UserService {
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http) {
        this.headers = new Headers({
            'Accept': 'application/json',
            'WWW-Authenticate': 'Basic',
            'content-type': 'application/json',
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

    verify() {
        return this.http.get('/api/verify', this.options).map((response: Response) => response.json());
    }

    forgotPassword(email: string) {
        return this.http.post('/rest-auth/password/reset/', JSON.stringify({ email }), this.options).map((response: Response) => response.json());
    }
    resetPassword(email: string) {
        return this.http.post('/rest-auth/password/reset/confirm/', JSON.stringify({ email }), this.options).map((response: Response) => response.json());
    }

    getAll() {
        return this.http.get('/rest-auth/user/', this.options).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/rest-auth/user/' + id, this.options).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/rest-auth/registration/', user, this.options).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/rest-auth/user/' + user.id, user, this.options).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/rest-auth/user/' + id, this.options).map((response: Response) => response.json());
    }


    rgetAll():Promise<Array<User>> {
        return this.http.get('/api/users/', this.options).toPromise().then((response: Response) => response.json());
    }

    rgetById(id: number):Promise<User>  {
        return this.http.get('/api/users/' + id + '/', this.options).toPromise().then((response: Response) => response.json());
    }

    rcreate(user: User):Promise<User> {
        return this.http.post('/api/users/', user, this.options).toPromise().then((response: Response) => response.json());
    }

    rupdate(user: User):Promise<User>{
        return this.http.put('/api/users/' + user.id + '/', user, this.options).toPromise().then((response: Response) => response.json());
    }

    rdelete(id: number):Promise<User> {
        return this.http.delete('/api/users/' + id + '/', this.options).toPromise().then((response: Response) => response.json());
    }




}