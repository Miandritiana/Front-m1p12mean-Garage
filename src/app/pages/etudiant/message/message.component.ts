import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonCloseDirective, ButtonDirective, FormDirective, FormLabelDirective, ModalModule,FormControlDirective,InputGroupComponent, InputGroupTextDirective, FormSelectDirective,  } from '@coreui/angular';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Message } from '../../../modele/message';


@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    ModalModule,
    ButtonCloseDirective,
    ReactiveFormsModule, 
    FormsModule, 
    AutoCompleteModule,
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnChanges,OnInit{
  @Output() close: EventEmitter<boolean> = new EventEmitter();  // Output event to emit data to parent
  @Input() show:boolean=false; 
  @Input() message:Message|undefined;

  
  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      this.message=changes['message'].currentValue
    }

    
  }

  toggleLiveDemo() {
    this.show = !this.show;
    this.close.emit(this.show);
  }
}
