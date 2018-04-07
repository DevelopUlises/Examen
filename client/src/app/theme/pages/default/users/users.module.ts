import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { FormsModule } from "@angular/forms";
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {UserResolve,UsersResolve} from "./users.resolve"
import {UsersComponent} from "./users.component";
import {UserService} from "../../../../auth/_services";
//import {OnlyNumber} from "../../../../_directives/inputs.validation.directives";
import {FormComponent} from "./forms/form.component";


const routes: Routes = [
    {
        "path": "",
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": UsersComponent,
                "resolve": {
                    usersList: UsersResolve
                },
            },
            {
                "path": "create",
                "component": CreateComponent,
            },
            {
                "path": "edit/:id",
                "component": EditComponent,
                "resolve": {
                    user: UserResolve
                },
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LayoutModule,
        FormsModule,
        NgbModule.forRoot()
    ], providers: [
        UserService,
        UsersResolve,
        UserResolve
    ]
    , exports: [
        RouterModule
    ], declarations: [
        UsersComponent,
        CreateComponent,
        EditComponent,
        FormComponent,

    ]
})
export class UsersModule { }