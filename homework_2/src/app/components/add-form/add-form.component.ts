import { IUser } from 'src/app/user';
import { ApiService } from './../../services/api.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit, OnDestroy {
  show = false;
  form: FormGroup;
  error = '';
  subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private UsersService: UsersService,
    private ApiService: ApiService
  ) {
    this.subscription = this.UsersService.onToggle().subscribe(
      (value) => (this.show = value)
    );
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(60),
        ],
      ],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    const user: IUser = {
      id: this.UsersService.getLastId() + 1,
      name:
        this.form.controls['name'].value +
        ' ' +
        this.form.controls['surname'].value,
      username: this.form.controls['username'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
    };
    this.ApiService.addUser_API(user).subscribe(
      (value) => {
        this.error = '';
        this.UsersService.addUser(user);
        alert(
          `User with id: ${user.id} and name: ${
            user.name + user.username
          } was added`
        );
        this.form.reset();
      },
      (err) => {
        this.error = "Server error! Can't add a user!";
      }
    );
  }
  onToggle() {
    this.UsersService.toggle();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
