import {AfterViewInit, Component} from '@angular/core';
import {AuthorizationService} from "../../../services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signout',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements AfterViewInit{
  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    this.router.navigate(['/login']);
  }

}
