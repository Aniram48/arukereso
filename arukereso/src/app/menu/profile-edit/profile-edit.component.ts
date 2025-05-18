import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  imports:[ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<ProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.profileForm = this.fb.group({
      name: [data.name, [Validators.required]],
      email: [data.email, [Validators.required, Validators.email]],
      phone: [data.phone, [Validators.required]],
      bio: [data.bio, [Validators.required]],
      image: [data.image],
      password: ['', [ Validators.minLength(6)]],  

    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      this.usersService.updateUser(updatedUser).subscribe(() => {
        this.dialogRef.close(updatedUser); 
      });
    }
  }

  closeDialog() {
    this.dialogRef.close(); 
  }
  ngOnInit() {
    const passwordControl = this.profileForm.get('password');
    if (passwordControl) {
      
    }
  }
}