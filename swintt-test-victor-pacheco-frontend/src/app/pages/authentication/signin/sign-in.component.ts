import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from "../../../services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  constructor(private authorizationService: AuthorizationService, private router: Router) {
  }

  ngOnInit(): void {
    // this.router.navigate(['/my-notes']);
  }

}
