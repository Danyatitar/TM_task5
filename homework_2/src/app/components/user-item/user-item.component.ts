import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { IUser } from 'src/app/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit, OnChanges {
  img_number = Math.round(Math.random() * 9 + 1);
  value: boolean = false;
  @Input() selected: boolean = false;
  @Input() user: IUser = {
    id: 0,
    name: '',
    username: '',
    email: '',
    phone: '',
  };
  @Output() selectUser: EventEmitter<IUser> = new EventEmitter();
  @Output() unselectUser: EventEmitter<IUser> = new EventEmitter();

  constructor() {
    this.value = this.selected;
  }
  ngOnInit(): void {}

  onSelectToggle(user: IUser) {
    this.value = !this.value;
    if (this.value) {
      this.selectUser.emit(user);
    } else {
      this.unselectUser.emit(user);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.value = this.selected;
  }
}
