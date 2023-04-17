import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field-message',
  templateUrl: './form-field-message.component.html',
})
export class FormFieldMessageComponent implements OnInit{
  @Input() form!:FormGroup ;
  @Input() fieldName!: string;
  messages: any;
  
  ngOnInit(): void {
    this.messages= {
      required: `${this.fieldName} is required.`,
      minLength: `The ${this.fieldName} is so short`,
      min:`The ${this.fieldName} minimun values is `
    }
  }
}
