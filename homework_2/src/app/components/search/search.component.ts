import { ApiService } from './../../services/api.service';
import { Subscription } from 'rxjs';
import { ISelectedUser } from './../../user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  name = '';
  error = '';
  foundUsers: ISelectedUser[] = [];
  isDisabled = true;
  subscription: Subscription;

  constructor(
    private UsersService: UsersService,
    private ApiService: ApiService
  ) {
    this.subscription = this.UsersService.onSelect().subscribe((value) => {
      this.foundUsers = value;
      this.isDisabled =
        [...this.foundUsers].filter((item) => item.selected).length === 0;
    });
  }
  ngOnInit(): void {
    this.UsersService.getUserbyName(this.name);
  }
  onSelectAll() {
    this.UsersService.selectAll();
  }
  onDeleteSelection() {
    this.foundUsers.forEach((item) => {
      if (item.selected) {
        this.ApiService.deleteUsers_API(item.user).subscribe(
          (value) => {
            this.error = '';
            this.UsersService.deleteUser(item);
            alert(
              `User with id:${item.user.id} and name: ${item.user.name} was deleted`
            );
          },
          (err) => {
            this.error = "Server error! Can't delete a user!";
          },
          () => {
            if (!this.error) {
            }
          }
        );
      }
    });
  }
  onChange() {
    this.UsersService.getUserbyName(this.name);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
