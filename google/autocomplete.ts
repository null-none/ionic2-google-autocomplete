import {Component, NgZone} from '@angular/core';
import {ViewController} from 'ionic-angular';

declare var google;

@Component({
  templateUrl: 'autocomplete.html'
})

export class Autocomplete {
  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();

  constructor(public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: { country: 'RU' } }, function(predictions, status) {
      me.autocompleteItems = [];
      me.zone.run(function() {
        predictions.forEach(function(prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }
}
