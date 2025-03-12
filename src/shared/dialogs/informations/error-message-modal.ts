import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';

@Component({
    selector: 'app-delete-modal',
    styleUrls: ['../../modal.scss'],
    template: `
<div class="modal-header " style='border: 1px solid #cf031a;margin: 11px;border-radius: 2px;padding: 5px;background: #f9e1e4;'>

<h4 class="modal-title" >
     <i class="fa-solid fa-triangle-exclamation" style='color:#cf031a;font-size: 21px;'></i>
     <span style='margin-left:10px'>Status Code :
       <span style='color:#d73043;font-size: 18px;margin-left:10px'>{{statusCode}}</span>
    </span>
</h4>
<button type="button" class="btn-close" style="border: none; height: 30px; width: 30px;background: transparent;color:#cf031a" aria-label="Close" (click)="activeModal.close(false)">
        <i class="fa-solid fa-xmark"></i>
    </button>
</div>

<div class="" style="border: 1px solid #d0d8e3; margin: 30px; padding:5px">

<div style="color:#ee3a48"> Unknown app type/model </div>
<div style="color:#767676"> {{errorMessage}}</div>

</div>


<div class="modal-footer">
<button type="button" class="btn btn-success"
    (click)="activeModal.close(false)"
    style="padding:2px 10px; border-radius: 3px; background-color: #017e84;">
    <span class="d-none d-sm-inline" style="font-size: 13px;">Tamam</span>
</button>
</div>
  `

})
export class ErrorMessageModalComponents {
    @Input() errorMessage;
    @Input() statusCode;
    constructor(public activeModal: NgbActiveModal) {

    }

    

  }

