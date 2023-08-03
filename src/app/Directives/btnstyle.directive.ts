import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBtnstyle]'
})
export class BtnstyleDirective {
btnEl: any
  constructor(private renderer: Renderer2,
    private elementRef: ElementRef) {
    this.btnEl = this.elementRef.nativeElement

    const btnStyles: any = {
      'background-color': '#1966D2',
      'color':'white'
    }
    Object.keys(btnStyles).forEach(newStyle => {
      this.renderer.setStyle(
        this.btnEl, `${newStyle}`, btnStyles[newStyle]
      )
    })
   }

}
