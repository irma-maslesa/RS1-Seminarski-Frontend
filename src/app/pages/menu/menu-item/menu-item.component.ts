import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('5s cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]), trigger(
      'inOut',
      [
        state('collapsed', style({ opacity: 0 })),
        state('expanded', style({ opacity: 1 })),
        transition(
          'collapsed => expanded',
          [
            animate('10s ease-in-out')
          ]
        ),
        transition(
          'expanded => collapsed',
          [
            animate('10s ease-in-out')
          ]
        ),
      ]
    )
  ]
})
export class MenuItemComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() depth;

  @Input() parentExpanded: boolean = false;
  expanded: boolean;

  ngOnInit() {
    this.expanded = false;
  }

  onItemClicked() {
    this.expanded = !this.expanded
  }

  ngOnChanges(changes: SimpleChanges): void {
    var currentObject = changes.parentExpanded;
    if (currentObject != null && !currentObject.firstChange) {
      if (!currentObject.currentValue)
        this.expanded = currentObject.currentValue;
    }
  }
}