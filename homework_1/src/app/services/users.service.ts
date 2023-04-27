import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { users } from '../mock-user';
import { ISelectedUser } from '../user';

interface IResult {
  users: ISelectedUser[];
  isDisable: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private selectedUsers: ISelectedUser[] = this.getUsers();
  private subject = new Subject<IResult>();
  private name = '';
  constructor() {}

  selectUser(id: number): void {
    this.selectedUsers.forEach((item) => {
      if (item.user.id === id) {
        item.selected = true;
      }
    });

    if (this.name) {
      this.subject.next({
        users: this.getUserbyName(this.name),
        isDisable: false,
      });
    } else {
      this.subject.next({ users: this.selectedUsers, isDisable: false });
    }
  }
  unSelectUser(id: number): void {
    this.selectedUsers.forEach((item) => {
      if (item.user.id === id) {
        item.selected = false;
      }
    });

    if (this.name) {
      this.subject.next({
        users: this.getUserbyName(this.name),
        isDisable:
          [...this.selectedUsers].filter((item) => item.selected).length === 0,
      });
    } else {
      this.subject.next({
        users: this.selectedUsers,
        isDisable:
          [...this.selectedUsers].filter((item) => item.selected).length === 0,
      });
    }
  }
  selectAll(): void {
    if (this.name) {
      this.selectedUsers = this.selectedUsers.map((item) => {
        if (this.getUserbyName(this.name).indexOf(item) !== -1) {
          return { ...item, selected: true };
        } else {
          return { ...item };
        }
      });

      this.subject.next({
        users: this.getUserbyName(this.name),
        isDisable: false,
      });
    } else {
      this.selectedUsers = this.selectedUsers.map((item) => {
        return { ...item, selected: true };
      });

      this.subject.next({ users: this.selectedUsers, isDisable: false });
    }
  }

  onSelect(): Observable<IResult> {
    return this.subject.asObservable();
  }

  getUsers(): ISelectedUser[] {
    return [...users].map((item) => {
      return { user: item, selected: false };
    });
  }

  getUserbyName(name: string): ISelectedUser[] {
    this.name = name;
    const result: ISelectedUser[] = [...this.selectedUsers].filter(
      (item) =>
        item.user.firstname.includes(name) || item.user.lastname.includes(name)
    );

    this.subject.next({
      users: result,
      isDisable:
        [...this.selectedUsers].filter((item) => item.selected).length === 0,
    });
    return result;
  }

  deleteUser(): void {
    this.selectedUsers.forEach((item) => {
      if (item.selected) {
        users.splice(users.indexOf(item.user), 1);
      }
    });
    this.selectedUsers = this.selectedUsers.filter((item) => !item.selected);

    if (this.name) {
      this.subject.next({
        users: this.getUserbyName(this.name),
        isDisable: true,
      });
    } else {
      this.subject.next({ users: this.selectedUsers, isDisable: true });
    }
  }

  sortUsers(order: string): void {
    switch (order) {
      case 'id':
        this.selectedUsers = this.selectedUsers.sort(
          (a, b) => a.user.id - b.user.id
        );
        break;
      case 'reverse-id':
        this.selectedUsers = this.selectedUsers.sort(
          (a, b) => b.user.id - a.user.id
        );
        break;
      case 'name':
        this.selectedUsers = this.selectedUsers.sort((a, b) =>
          (a.user.firstname + a.user.lastname).localeCompare(
            b.user.firstname + b.user.lastname
          )
        );
        break;
      case 'reverse-name':
        this.selectedUsers = this.selectedUsers.sort((a, b) =>
          (b.user.firstname + b.user.lastname).localeCompare(
            a.user.firstname + a.user.lastname
          )
        );
        break;
    }
    if (this.name) {
      this.subject.next({
        users: this.getUserbyName(this.name),
        isDisable:
          [...this.selectedUsers].filter((item) => item.selected).length === 0,
      });
    } else {
      this.subject.next({
        users: this.selectedUsers,
        isDisable:
          [...this.selectedUsers].filter((item) => item.selected).length === 0,
      });
    }
  }
}
