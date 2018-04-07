import { Injectable } from '@angular/core';

declare let $: any;


interface ShareObj {
    [id: string]: any;
}

@Injectable()
export class GlobalDataService {
    currentUser: ShareObj = {};


    showNotify(message) {
        $.notify({
            // options
            icon: 'icon la la-warning',
            title: 'Error',
            message: message,
        }, {
                type: "danger",
                allow_dismiss: true,
                newest_on_top: false,
                showProgressbar: false,
                placement: {
                    from: "top",
                    align: "right"
                },
                offset: 20,
                spacing: 10,
                z_index: 1031,
                delay: 5000,
                timer: 1000,
                mouse_over: true,
                animate: {
                    enter: 'animated bounceInDown',
                    exit: 'animated bounceOutDown'
                }
            });
    }

}