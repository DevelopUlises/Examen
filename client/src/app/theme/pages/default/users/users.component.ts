import { Component, OnInit, ViewEncapsulation, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalDataService } from "../../../../_services/globalData";
import { Helpers } from "../../../../helpers";
import {User} from "../../../../auth/_models";
import {UserService} from "../../../../auth/_services";


declare let swal: any;

@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-wrapper",
    templateUrl: "./users.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit, AfterViewInit {
    usersList: User[];
    datatable: any;
    options: any;
    constructor(private router: Router,
                private elRef: ElementRef,
                private route: ActivatedRoute,
                public globaldata: GlobalDataService,
                private usersService: UserService
    ) { }

    ngOnInit() {
        this.route.data
            .subscribe(data => {
                this.usersList = data.usersList;
            });

    }

    ngAfterViewInit() {

        let _self = this;
        this.options = {
            // datasource definition
            data: {
                type: 'local',
                source: _self.usersList,
                pageSize: 10,
            },

            // layout definition
            layout: {
                theme: 'default', // datatable theme
                class: '', // custom wrapper class
                scroll: true, // enable/disable datatable scroll both horizontal and vertical when needed.
                height: 450, // datatable's body's fixed height
                footer: false, // display/hide footer

                smoothScroll: {
                    scrollbarShown: true
                },

                spinner: {
                    overlayColor: '#000000',
                    opacity: 0,
                    type: 'loader',
                    state: 'brand',
                    message: true
                },

                icons: {
                    sort: { asc: 'la la-arrow-up', desc: 'la la-arrow-down' },
                    pagination: {
                        next: 'la la-angle-right',
                        prev: 'la la-angle-left',
                        first: 'la la-angle-double-left',
                        last: 'la la-angle-double-right',
                        more: 'la la-ellipsis-h'
                    },
                    rowDetail: { expand: 'fa fa-caret-down', collapse: 'fa fa-caret-right' }
                }
            },

            // column sorting
            sortable: true,

            pagination: true,

            search: {
                input: $('#generalSearch')
            },

            // columns definition
            columns: [
                {
                    field: "cdi",
                    title: "CDI",
                },
                 {
                    field: "email",
                    title: "Email",
                },
                {
                    field: "first_name",
                    title: "First Name",
                },
                {
                    field: "contact_phone",
                    title: "Contact Phone",
                },
                {
                    field: "locale_city",
                    title: "City",
                },
                {
                    field: "locale_country",
                    title: "Country",
                },
                {
                    field: "locale_address",
                    title: "Address",
                },
                {
                    field: "is_staff",
                    title: "Staff?",
                    template: function(row) {
                        let status = {
                            true: { 'title': 'Yes', 'class': 'm-badge--success' },
                            false: { 'title': 'No', 'class': ' m-badge--danger' },
                        };
                        return '<span class="m-badge ' + status[row.is_staff].class + ' m-badge--wide">' + status[row.is_staff].title + '</span>';
                    }
                },
                {
                    field: "is_active",
                    title: "Active?",
                    template: function(row) {
                        let status = {
                            true: { 'title': 'Yes', 'class': 'm-badge--success' },
                            false: { 'title': 'No', 'class': ' m-badge--danger' },
                        };
                        return '<span class="m-badge ' + status[row.is_active].class + ' m-badge--wide">' + status[row.is_active].title + '</span>';
                    }
                },
                {
                    field: "role",
                    title: "Role",
                },
                {
                    field: "Actions",
                    width: 110,
                    title: "Actions",
                    sortable: false,
                    overflow: 'visible',
                    template: function(row) {
                        let dropup = (row.getDatatable().getPageSize() - row.getIndex()) <= 4 ? 'dropup' : '';
                        return '\
						<div class="dropdown ' + dropup + '">\
							<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
                                <i class="la la-ellipsis-h"></i>\
                            </a>\
						  	<div class="dropdown-menu dropdown-menu-right">\
						    	<a class="dropdown-item edit_product"  data-id="'+ row.id + '" style="cursor: pointer;"><i class="la la-edit"></i> Edit User</a>\
						    	<a class="dropdown-item delete_product" data-id="'+ row.id + '" style="cursor: pointer;"><i class="la la-stop"></i> Delete User</a>\
						  	</div>\
						</div>\
						\
					';
                    }
                }]
        };

        this.datatable = (<any>$('#m_datatable_products')).mDatatable(this.options);
        $(_self.elRef.nativeElement).find('.edit_product').click(function() {
            let id = $(this).attr('data-id');
            _self.router.navigate(['users/edit/' + id]);
        });
        $(_self.elRef.nativeElement).find('.delete_product').click(function() {
            let id = $(this).attr('data-id');
            _self.deleteUser(Number(id));
        });



    }

    deleteUser(id) {
        let _self = this;
        swal({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then(function (result) {
                if (result.value) {
                    Helpers.setLoading(true);
                    _self.usersService.rdelete(id).then(()=>{
                        let index = _self.usersList.findIndex(d => d.id === id);
                            _self.usersList.splice(index, 1);
                            Helpers.setLoading(false);
                            _self.refresh();
                    });

                }
            }
        );
    }

    refresh(): void {
        Helpers.setLoading(true);
        this.datatable.destroy();
        this.options.data.source = this.usersList;
        this.datatable = (<any>$('#m_datatable_products')).mDatatable(this.options);
        let _self = this;
        $(_self.elRef.nativeElement).find('.edit_product').click(function() {
            let id = $(this).attr('data-id');
            _self.router.navigate(['users/edit/' + id]);
        });
        $(_self.elRef.nativeElement).find('.delete_product').click(function() {
            let id = $(this).attr('data-id');
            _self.deleteUser(Number(id));
        });
        Helpers.setLoading(false);
    }

}
