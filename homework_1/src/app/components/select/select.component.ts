import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  orders: { value: string; viewValue: string }[] = [
    { value: 'id', viewValue: 'Sort by id' },
    { value: 'reverse-id', viewValue: 'Sort by id-reverse' },
    { value: 'name', viewValue: 'Sort by Fullname' },
    { value: 'reverse-name', viewValue: 'Sort by Fullname-reverse' },
  ];
  sortOption = 'id';
  constructor(private UsersService: UsersService) {}

  sortUsers() {
    this.UsersService.sortUsers(this.sortOption);
  }
}
