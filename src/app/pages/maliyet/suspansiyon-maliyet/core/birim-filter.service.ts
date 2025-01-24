import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BirimFilterService {

  constructor(private BirimService: BirimFilterService) { }
  rowData: any[];
  searchKeys = { array: [] };
  filterClearDisabled: boolean = true;
  filtredBy: any;



}
