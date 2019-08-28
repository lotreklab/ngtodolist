import {Component, OnInit, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() alert: Subject<string>;

  message: string;
  @Input() type: string;

  ngOnInit() {
    this.alert.subscribe((message) => this.message = message);
    this.alert.pipe(debounceTime(5000)).subscribe(() => this.message = null);
  }



}
