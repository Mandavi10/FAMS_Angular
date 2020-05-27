import { Directive,HostListener } from '@angular/core';

@Directive({
  selector: '[appNorightclick]'
})
export class NorightclickDirective {
  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
    alert('Right click not allowed');
  }
}
