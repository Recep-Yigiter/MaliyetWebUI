import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-delete-modal',
    styleUrls: ['../../modal.scss'],
    template: `

<div id="myModal">
<div class="modal-header "style="padding: 0rem 0rem;">
  <h4 class="modal-title" style="margin-left:10px;">401 !</h4>
  <h4 class="modal-title">{{confirmationBoxTitle}} </h4>
  <button  type="button" class="btn-close close-button" style="border: none; height: 30px; width: 30px;" aria-label="Close" (click)="activeModal.close(false)">
      <i class="fa-solid fa-xmark"></i>
  </button>
</div>

<div class="" style="padding:20px">

Bu işlemi yapmaya yetkiniz yok.
</div>


<div class="modal-footer">
<button type="button" class="btn btn-success"
    (click)="activeModal.close(true)"
    style="padding:2px 10px; border-radius: 3px; background-color: #017e84;">
    
    <span class="d-none d-sm-inline" style="font-size: 13px;">Kapat</span>
</button>

</div>

</div>


  `

})
export class UnAuthorizedModalComponents implements OnInit {
    @Input() confirmationBoxTitle;
    @Input() confirmationMessage;

    constructor(public activeModal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initializeModal();
    }
    initializeModal() {
        // Modal dışına tıklanırsa modalı kapat
        // window.onclick = (event: MouseEvent) => {
        //     this.activeModal.close(false)
        //     // if (event.target === modal) {
        //     //     closeModal();
        //     // }
        // }

        // Modalı açmak için örnek: openModal();
    }


}

