import { Injectable } from "@angular/core";
import { API } from 'aws-amplify';
import { Constants } from "./constants";

export interface Note {
  id: string;
  user: string;
  description: string;
  created_at: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  createNote(description: string){
    const requestBody = {description}
    return API.post(Constants.API_NOTES_NAME, ``, {body: requestBody})
  }

  getNotes(){
    return API.get(Constants.API_NOTES_NAME, ``, {})
  }

  getNote(noteId: string | null){
    return API.get(Constants.API_NOTES_NAME, `/${noteId}`, {})
  }

  updateNote(noteId: string, description: string){
    const requestBody = {description}
    return API.put(Constants.API_NOTES_NAME, `/${noteId}`, {body: requestBody})
  }

  deleteNote(noteId: string){
    return API.del(Constants.API_NOTES_NAME, `/${noteId}`, {})
  }

}
