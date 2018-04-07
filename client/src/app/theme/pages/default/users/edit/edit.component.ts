import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {User} from "../../../../../auth/_models";

@Component({
    selector: '.m-grid__item.m-grid__item--fluid.m-wrapper',
    templateUrl: './edit.component.html',
    styles: ['']
})
export class EditComponent implements OnInit, AfterViewInit {
    user: User;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data
            .subscribe(data => {
                this.user = data.user;
            });
    }

    ngAfterViewInit() { }



}
