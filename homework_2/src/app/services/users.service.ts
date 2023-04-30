import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ISelectedUser, IUser } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private selectedUsers: ISelectedUser[] = [];
  private isShown = false;
  private subject = new Subject<ISelectedUser[]>();
  private subjectForm = new Subject<boolean>();
  private name = '';
  constructor() {}

  selectUser(id: number): void {
    this.selectedUsers.forEach((item) => {
      if (item.user.id === id) {
        item.selected = true;
      }
    });

    if (this.name) {
      this.subject.next(this.getUserbyName(this.name));
    } else {
      this.subject.next(this.selectedUsers);
    }
  }
  unSelectUser(id: number): void {
    this.selectedUsers.forEach((item) => {
      if (item.user.id === id) {
        item.selected = false;
      }
    });

    if (this.name) {
      this.subject.next(this.getUserbyName(this.name));
    } else {
      this.subject.next(this.selectedUsers);
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

      this.subject.next(this.getUserbyName(this.name));
    } else {
      this.selectedUsers = this.selectedUsers.map((item) => {
        return { ...item, selected: true };
      });

      this.subject.next(this.selectedUsers);
    }
  }

  onSelect(): Observable<ISelectedUser[]> {
    return this.subject.asObservable();
  }

  getUsers(users: IUser[]) {
    this.selectedUsers = [...users].map((item) => {
      return { user: item, selected: false };
    });
    this.subject.next(this.selectedUsers);
  }

  getUserbyName(name: string): ISelectedUser[] {
    this.name = name;
    const result: ISelectedUser[] = [...this.selectedUsers].filter((item) =>
      item.user.name.toLowerCase().includes(name.toLowerCase())
    );
    this.subject.next(result);

    return result;
  }

  deleteUser(user: ISelectedUser): void {
    const index = this.selectedUsers.indexOf(user);
    this.selectedUsers.splice(index, 1);

    if (this.name) {
      this.subject.next(this.getUserbyName(this.name));
    } else {
      this.subject.next(this.selectedUsers);
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
          a.user.name.localeCompare(b.user.name)
        );
        break;
      case 'reverse-name':
        this.selectedUsers = this.selectedUsers.sort((a, b) =>
          b.user.name.localeCompare(a.user.name)
        );
        break;
      case 'username':
        this.selectedUsers = this.selectedUsers.sort((a, b) =>
          a.user.username.localeCompare(b.user.username.toLowerCase())
        );
        break;
      case 'reverse-username':
        this.selectedUsers = this.selectedUsers.sort((a, b) =>
          b.user.username.localeCompare(a.user.username)
        );
        break;
    }
    if (this.name) {
      this.subject.next(this.getUserbyName(this.name));
    } else {
      this.subject.next(this.selectedUsers);
    }
  }

  addUser(user: IUser) {
    this.selectedUsers.push({ user: user, selected: false });
    this.subject.next(this.selectedUsers);
  }
  getLastId(): number {
    return [...this.selectedUsers].sort((a, b) => b.user.id - a.user.id)[0].user
      .id;
  }
  onToggle(): Observable<boolean> {
    return this.subjectForm.asObservable();
  }
  toggle() {
    this.isShown = !this.isShown;
    this.subjectForm.next(this.isShown);
  }
}
