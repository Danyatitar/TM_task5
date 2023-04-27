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
  foundUsers: ISelectedUser[] = [];
  isDisable: boolean = true;

  subscription: Subscription;
  constructor(private UsersService: UsersService) {
    this.subscription = this.UsersService.onSelect().subscribe((value) => {
      this.isDisable = value.isDisable;
    });
  }
  ngOnInit(): void {
    this.foundUsers = this.UsersService.getUserbyName(this.name);
  }
  onSelectAll() {
    this.UsersService.selectAll();
  }
  onDeleteSelection() {
    this.UsersService.deleteUser();
  }
  onChange() {
    this.foundUsers = this.UsersService.getUserbyName(this.name);
    console.log(this.foundUsers);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
