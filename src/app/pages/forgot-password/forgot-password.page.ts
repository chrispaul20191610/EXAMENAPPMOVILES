import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  providers:[ChatService],
})
export class ForgotPasswordPage implements OnInit {
  userEmail=  new FormControl('');
  constructor(private authSvc:ChatService, private router:Router) { }

  ngOnInit() {
  }
  async onReset(){
    try{
      const email= this.userEmail.value;
      await this.authSvc.resetPassword(email);
      window.alert("Email enviado, mira tu correo")
      //redireccion

      this.router.navigate(["/login"]);

    }catch(error){
      console.log(error);
    }
    
  }

}
