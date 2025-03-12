
import { Directive, HostListener, ElementRef, OnInit, Input, AfterViewInit, Renderer2 } from "@angular/core";
import { CurrencyPipe } from '@angular/common';

@Directive({ selector: "[currencyInput]" })
export class CurrencyInputDirective implements OnInit,AfterViewInit  {

  // build the regex based on max pre decimal digits allowed
  private regexString(max?: number) {
    const maxStr = max ? `{0,${max}}` : `+`;
    return `^(\\d${maxStr}(\\.\\d{0,2})?|\\.\\d{0,2})$`
  }
  private digitRegex: RegExp;
  private setRegex(maxDigits?: number) {
    this.digitRegex = new RegExp(this.regexString(maxDigits), 'g')
  }
  @Input()
  set maxDigits(maxDigits: number) {
    this.setRegex(maxDigits);
  } 

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe,
    private renderer: Renderer2
  ) {
    this.el = this.elementRef.nativeElement;
    this.setRegex();
  }

  ngOnInit() {
    setTimeout(() => {
      this.formatCurrency();
    });
    this.el.value = this.currencyPipe.transform(this.el.value, '₺');
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.formatCurrency();
    });
  }
  private formatCurrency() {
    // İlk olarak input değerini almak
    let value = this.el.value.replace(/[^0-9.]+/g, ''); 
    
    if (value && value !== '') {
      // Para birimi formatını eklemek
      const formattedValue = this.currencyPipe.transform(value, '₺');
      if (formattedValue) {
        this.renderer.setProperty(this.el, 'value', formattedValue);
      }
    }
  }
  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    this.el.value = value.replace(/[^0-9.]+/g, '')
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.el.value = this.currencyPipe.transform(value, '₺');
  }

  private lastValid = '';
  @HostListener('input', ['$event'])
  onInput(event) {
    const cleanValue = (event.target.value.match(this.digitRegex) || []).join('')
    if (cleanValue || !event.target.value)
      this.lastValid = cleanValue
    this.el.value = cleanValue || this.lastValid
  }
}