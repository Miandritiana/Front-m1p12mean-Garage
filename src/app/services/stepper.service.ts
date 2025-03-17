import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  constructor() { }

  private stepSubject = new BehaviorSubject<number>(1); // Étape par défaut = 1
  currentStep$ = this.stepSubject.asObservable();

  setStep(step: number) {
    this.stepSubject.next(step);
  }
  
}
