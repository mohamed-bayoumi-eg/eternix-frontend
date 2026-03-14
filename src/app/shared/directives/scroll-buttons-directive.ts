import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, signal, effect, input } from '@angular/core';

@Directive({
  selector: '[appScrollButtons]',
  standalone: true
})
export class ScrollButtonsDirective implements OnInit, OnDestroy {
  private resizeObserver?: ResizeObserver;
  private buttonsContainer?: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.createButtons();

    this.resizeObserver = new ResizeObserver(() => this.checkScroll());
    this.resizeObserver.observe(this.el.nativeElement);

    this.renderer.listen(this.el.nativeElement, 'scroll', () => this.checkScroll());
  }

  private createButtons() {
    this.buttonsContainer = this.renderer.createElement('div');
    this.renderer.addClass(this.buttonsContainer, 'floating-scroll-buttons');
    this.renderer.setStyle(this.buttonsContainer, 'display', 'none'); 

    const upBtn = this.createBtn('fa-chevron-up', () => {
      this.el.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const downBtn = this.createBtn('fa-chevron-down', () => {
      this.el.nativeElement.scrollTo({ top: this.el.nativeElement.scrollHeight, behavior: 'smooth' });
    });

    this.renderer.appendChild(this.buttonsContainer, upBtn);
    this.renderer.appendChild(this.buttonsContainer, downBtn);
    this.renderer.appendChild(document.body, this.buttonsContainer); 
  }

  private createBtn(iconClass: string, onClick: () => void): HTMLElement {
    const btn = this.renderer.createElement('button');
    btn.className = 'scroll-btn';
    btn.innerHTML = `<i class="fas ${iconClass}"></i>`;
    this.renderer.listen(btn, 'click', onClick);
    return btn;
  }

  private checkScroll() {
    const el = this.el.nativeElement;
    const hasScroll = el.scrollHeight > (el.offsetHeight + 10);
    
    if (this.buttonsContainer) {
      this.renderer.setStyle(this.buttonsContainer, 'display', hasScroll ? 'flex' : 'none');
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
    if (this.buttonsContainer) {
      this.buttonsContainer.remove();
    }
  }
}