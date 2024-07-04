import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {AuthorizationService} from "../../../services/authorization.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit{

  user: any;
  loading = false;

  form = new FormGroup({
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private authService: AuthorizationService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  createNote() {
    this.loading = true;
    this.apiService.createNote(<string>this.form.value.description).then((data) => {
      this.openSnackBar('Note created successfully', 'ok');
      this.goToMyNotes();
    })
    .catch(err => {
      this.openSnackBar('Error creating the note, try again', 'ok');
    })
    .finally(() => {
      this.loading = false;
    });
  }

  getCurrentUser(){
    this.authService.getUser().then(data => this.user = data['attributes']['email']);
  }

  goToMyNotes(){
    this.router.navigate(['/my-notes']);
  }

  goToCloseSession(){
    this.authService.signOut();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
