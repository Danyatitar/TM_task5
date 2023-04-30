import { ApiService } from './../../services/api.service';
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
  error = '';
  users: IUser[] = [];
  constructor(
    private UsersService: UsersService,
    private ApiService: ApiService
  ) {
    this.subscription = this.UsersService.onSelect().subscribe((value) => {
      this.selectedUsers = value;
    });
  }
  ngOnInit(): void {
    this.ApiService.getUsers_API().subscribe(
      (value) => {
        this.error = '';
        this.UsersService.getUsers(value);
      },
      (err) => {
        this.error = "Server error! Users don't found!";
      }
    );
  }

  onSelect(user: IUser) {
    this.UsersService.selectUser(user.id);
  }
  onUnSelect(user: IUser) {
    this.UsersService.unSelectUser(user.id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
