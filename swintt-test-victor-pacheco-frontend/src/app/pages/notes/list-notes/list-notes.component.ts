import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Auth} from "aws-amplify";
import {ApiService, Note} from "../../../services/api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AuthorizationService} from "../../../services/authorization.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss']
})
export class ListNotesComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'user', 'description', 'created_at', 'options'];
  notes: Note[] = [];
  dataSource = new MatTableDataSource<Note>(this.notes);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  user: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthorizationService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngAfterViewInit(): void {
    this.printToken();
    this.getCurrentUser();
    this.getNotes();
  }

  getNotes(){
    this.apiService.getNotes().then(data => {
      this.notes = data
      this.dataSource = new MatTableDataSource<Note>(this.notes);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteNote(note: Note){
    this.apiService.deleteNote(note.id).then(data => {
      this.openSnackBar('Note deleted successfully', 'ok');
      this.getNotes();
    }).catch(err => {
      console.log(err);
      this.openSnackBar('Error deleting the note, try again', 'ok');
    })
  }

  updateNote(note: Note){
    this.router.navigate(['/update-note', note.id]);
  }

  convertCreatedAt(createdAt: number){
    return new Date(createdAt);
  }

  getCurrentUser(){
    this.authService.getUser().then(data => this.user = data['attributes']['email']);
  }

  goToCreateNote(){
    this.router.navigate(['/create-note']);
  }

  goToCloseSession(){
    this.authService.signOut();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  async printToken(): Promise<void>{
    console.log((await Auth.currentSession()).getIdToken().getJwtToken());
  }

}
