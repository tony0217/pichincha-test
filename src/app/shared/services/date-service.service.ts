import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { format, startOfToday, isAfter, isToday } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  formatDate(date: string): string {
    if (!date) {
      return '';
    }
    return format(new Date(date), 'yyyy-MM-dd');
  }

  validateDateIsBeforeOrToday(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const selectedDateLocal = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
    const today = startOfToday();
    
    return isAfter(selectedDateLocal, today) || isToday(selectedDateLocal) ? null : { invalidDate: true };
  }
  
}
