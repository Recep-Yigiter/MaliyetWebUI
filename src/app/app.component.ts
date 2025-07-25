import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter } from 'rxjs';
import { ModalTriggerService } from './core/services/modal-trigger.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnAuthorizedModalComponents } from 'src/shared/dialogs/informations/unauthorized-modal';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

/**
 *
 */
constructor(
  private modalTrigger: ModalTriggerService,
    private modalService: NgbModal
  ) {
  
  
}
  ngOnInit(): void {
    this.listenToUnauthorized()
  }

    modalRef: any = null;
  listenToUnauthorized() {
    this.modalTrigger.unauthorized$.subscribe((message: string) => {
      if (this.modalRef) {
        // Modal zaten açık, sadece mesaj güncellenebilir
        this.modalRef.componentInstance.message = message;
      } else {
        this.modalRef = this.modalService.open(UnAuthorizedModalComponents, {
          backdrop: 'static',
          size: 'md'
        });
        this.modalRef.componentInstance.message = message;

        this.modalRef.result.finally(() => {
          // Modal kapandığında referansı temizle
          this.modalRef = null;
        });
      }
    });
  }

}
