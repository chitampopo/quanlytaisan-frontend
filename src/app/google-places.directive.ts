/// <reference types="@types/googlemaps" />
import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[google-place]',
})
export class GooglePlacesDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  private element: HTMLInputElement;

  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    const options = {
      componentRestrictions: {
        country: "vn"
      }
    };
    const autocomplete = new google.maps.places.Autocomplete(this.element);
    autocomplete.setOptions(options);

    //Event listener to monitor place changes in the input
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.onSelect.emit(autocomplete.getPlace());
    });
  }
}
