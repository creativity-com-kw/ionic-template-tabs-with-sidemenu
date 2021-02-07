import { Time } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFormat' })
export class DateFormat implements PipeTransform {
  transform(value: string | Date | Time, format: string): string {
    return moment(value).format(format);
  }
}
