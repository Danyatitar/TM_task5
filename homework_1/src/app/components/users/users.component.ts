import { UsersService } from 'src/app/services/users.service';
import { ISelectedUser } from './../../user';
import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { IUser } from 'src/app/user';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  selectedUsers: ISelectedUser[] = [];

  constructor(private UsersService: UsersService) {
    this.subscription = this.UsersService.onSelect().subscribe(
      (value) => (this.selectedUsers = value.users)
    );
    this.selectedUsers = UsersService.getUsers();
  }
  ngOnInit(): void {}

  onSelect(user: IUser) {
    this.UsersService.selectUser(user.id);
  }
  onUnSelect(user: IUser) {
    this.UsersService.unSelectUser(user.id);
    console.log(this.selectedUsers);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
