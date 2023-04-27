import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../components/search/search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UsersComponent } from '../components/users/users.component';
import { UserItemComponent } from '../components/user-item/user-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../components/button/button.component';
import { SelectComponent } from '../components/select/select.component';
import { UsersService } from '../services/users.service';

@NgModule({
  declarations: [
    SearchComponent,
    UsersComponent,
    UserItemComponent,
    ButtonComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
  ],
  providers: [UsersService],
  exports: [
    SearchComponent,
    UserItemComponent,
    UsersComponent,
    ButtonComponent,
    SelectComponent,
  ],
})
export class UsersModule {}
