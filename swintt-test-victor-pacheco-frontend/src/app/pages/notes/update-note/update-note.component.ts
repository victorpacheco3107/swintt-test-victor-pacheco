import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService, Note} from "../../../services/api.service";
import {AuthorizationService} from "../../../services/authorization.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit{

  user: any;
  loading = false;
  note: Note;

  form = new FormGroup({
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private authService: AuthorizationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    const noteId = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getNote(noteId).then(data => {
      this.note = data;
      this.form.setValue({
        description: this.note.description
      })
    })
    .catch(err => {
      this.openSnackBar("Note not found", 'ok');
      this.goToMyNotes();
    });
  }

  updateNote() {
    this.loading = true;
    this.apiService.updateNote(this.note.id, <string>this.form.value.description).then((data) => {
      this.openSnackBar('Note updated successfully', 'ok');
      this.goToMyNotes();
    })
      .catch(err => {
        this.openSnackBar('Error updating the note, try again', 'ok');
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
