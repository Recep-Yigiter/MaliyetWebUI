import { AgPromise, IAfterGuiAttachedParams, IDoesFilterPassParams, IFilterComp, IFilterParams } from 'ag-grid-community';

export class TurkishTextFilter implements IFilterComp {
  getGui(): HTMLElement {
    throw new Error('Method not implemented.');
  }
  destroy?(): void {
    throw new Error('Method not implemented.');
  }
  init?(params: IFilterParams<any, any>): AgPromise<void> | void {
    throw new Error('Method not implemented.');
  }
  isFilterActive(): boolean {
    throw new Error('Method not implemented.');
  }
  refresh?(newParams: IFilterParams): boolean {
    throw new Error('Method not implemented.');
  }
  doesFilterPass(params: IDoesFilterPassParams): boolean {
    throw new Error('Method not implemented.');
  }
  onNewRowsLoaded?(): void {
    throw new Error('Method not implemented.');
  }
  onAnyFilterChanged?(): void {
    throw new Error('Method not implemented.');
  }
  getModelAsString?(model: any): string {
    throw new Error('Method not implemented.');
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }
  afterGuiDetached?(): void {
    throw new Error('Method not implemented.');
  }
  private filterParams: IFilterParams;
  private filterValue: string;

  // Filtreleme işlemi yapacak olan fonksiyon
  filterChanged() {
    const value = this.filterValue;
    const normalizedValue = this.normalizeTurkishChars(value);
    this.filterValue = normalizedValue;
    this.onFilterChanged();
  }

  // Türkçe karakterleri normalize etme fonksiyonu
  normalizeTurkishChars(value: string): string {
    debugger;
    const turkishChars = [];
    const asciiChars   = [];
    
    let normalizedValue = value;
    
    turkishChars.forEach((char, index) => {
      normalizedValue = normalizedValue.replace(new RegExp(char, 'g'), asciiChars[index]);
    });

    return normalizedValue;
  }

  // Filtre değeri değiştiğinde tetiklenmesi gereken fonksiyon
  onFilterChanged() {
    if (this.filterParams && this.filterParams.filterChangedCallback) {
      this.filterParams.filterChangedCallback();
    }
  }

  // AG Grid parametreleriyle filtreyi ilişkilendirme
  setParams(params: IFilterParams) {
    this.filterParams = params;
  }

  // Kullanıcıdan gelen filtre değerini alıyoruz
  setFilterValue(value: string) {
    this.filterValue = value;
  }

  // Filtre parametrelerini almak için
  getModel() {
    return { filter: this.filterValue };
  }

  // Modeli ayarlamak için
  setModel(model: any) {
    this.filterValue = model.filter;
  }
}
