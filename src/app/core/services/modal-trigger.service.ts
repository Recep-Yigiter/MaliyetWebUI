import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalTriggerService {
  private _unauthorized$ = new Subject<string>();
  public unauthorized$ = this._unauthorized$.asObservable();

  triggerUnauthorized(message: string) {
    this._unauthorized$.next(message);
  }
}