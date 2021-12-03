import { Component, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonInput)
  input: IonInput;
  control = new FormControl([]);
  separatorKeysCodes = [SPACE, ENTER];
  valueInputControl = new FormControl();

  constructor(
      private zone: NgZone
  ) {}

  onKeydown(event: any): void {
    this.zone.run(() => {
      if (this.separatorKeysCodes.some(code => event.keyCode === code) && this.valueInputControl.value !== '') {
        this.add(this.valueInputControl.value);
      }
    });
  }


  remove(value: string): void {
    const values = this.control.value as string[];
    this.control.setValue(values.filter(t => t !== value));
  }


  add(value: string) {
    value.split(' ').forEach(v => {
      let values = this.control.value as Array<string>;
      values = values.filter(t => t !== v);
      if ((v || '').trim()) {
        values.push( v.trim());
        this.control.setValue(values);
      }
    });
    this.input.getInputElement().then(element => element.value = '');
  }
}
