import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {User} from "../../../../../auth/_models";


@Component({
    selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
    templateUrl: './create.component.html',
    styles: ['']
})
export class CreateComponent implements OnInit, AfterViewInit {
    user: User;


    constructor() { }

    ngOnInit() {
        this.user= new User();

    }

    ngAfterViewInit() { }

}
