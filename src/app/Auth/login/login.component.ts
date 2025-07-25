import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/Identity/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  msgs1: any;
  constructor(
    // private authService: AuthService,
    private router: Router,
    // private spinner: NgxSpinnerService,
    private UserService: UserService

  ) {

  }

  ngOnInit(): void {

  }








  loginObj: any = {
    "email": "",
    "password": ""
  }



  login() {


    this.UserService.login(this.loginObj, (res) => {
      localStorage.setItem("tokenData", JSON.stringify(res.token))
      let token = JSON.parse(localStorage.getItem('tokenData'));
      this.router.navigate(["/genel/kabin"])

    }, (error: HttpErrorResponse) => {})







  }


}
