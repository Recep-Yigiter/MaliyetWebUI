import { Component, Input } from '@angular/core';
import {  NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-modal',
    styleUrls: ['../../modal.scss'],
    template: `
<div class="modal-header ">

<h4 class="modal-title">Uyarı! </h4>
<button type="button" class="btn-close" style="border: none; height: 30px; width: 30px;" aria-label="Close" (click)="activeModal.close(false)">
        <i class="fa-solid fa-xmark"></i>
    </button>
</div>

<div class="">

{{content}}

</div>


<div class="modal-footer">
<button type="button" class="btn btn-success"
    (click)="activeModal.close(true)"
    style="padding:2px 10px; border-radius: 3px; background-color: #017e84;">
    <i class="fa fa-plus" style="color: #fff; margin-right: 5px; font-weight: 700;"></i>
    <span class="d-none d-sm-inline" style="font-size: 13px;">Evet</span>
</button>
<button type="button" class="btn "  (click)="activeModal.close(false)"
    style="padding:2px 10px; border-radius: 3px; background-color: #fdfdfd; border: 1px solid #e6e6e6;">
    <i class="fa fa-times" style="color: #000; margin-right: 5px; font-weight: 600;"></i>
    <span class="d-none d-sm-inline" style="font-size: 13px;">Hayır</span>
</button>
</div>
  `

})
export class ConfirmModalComponents {
    @Input() confirmationBoxTitle;
    @Input() confirmationMessage;
    @Input() content;

    constructor(public activeModal: NgbActiveModal) {

    }

    



}

