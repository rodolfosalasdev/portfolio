import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, DoCheck {

  public ableButton: boolean = true;
  public params = { type: '', msg: '', };
  public showAlert: boolean = false;
  public loginForm: FormGroup = this.fb.group({});

  public alerts: Array<any> = [{
    type: '',
    msg: '',
    timeout: 5000
  }];

  public alertsParams = {
    statusSuccess: 'success',
    statusDanger: 'danger',
    msgSuccess: `Login realizado com sucesso. (added: ${new Date().toLocaleTimeString()})`,
    msgDanger: `Usuário ou senha invalido. (added: ${new Date().toLocaleTimeString()})`,
  };

  constructor(private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.form();
  }

  public form() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngDoCheck(): void {
    this.ableButton = !this.loginForm.valid;
  }

  // public save() {
  //   this.alerts.forEach((params) => {
  //     if (this.loginForm.controls.userName.value == "UserMaster" && this.loginForm.controls.password.value == "H45NMngr201") {
  //       this.params = params;
  //       params.type = this.alertsParams.statusSuccess;
  //       params.msg = this.alertsParams.msgSuccess;
  //       this.showAlert = !this.showAlert;
  //       this.form();
  //       this.router.navigate(["/"]);
  //     } else {
  //       params.type = this.alertsParams.statusDanger;
  //       params.msg = this.alertsParams.msgDanger;
  //       this.showAlert = !this.showAlert;
  //       console.log("erro");
  //       console.log(this.showAlert );
        
  //     }
  //   })
  //   console.log('clicado');
  // }

  public save() {
    this.alerts.forEach((params) => {
      this.params = params
    })
    
    if (this.loginForm.controls.userName.value == "UserMaster" && this.loginForm.controls.password.value == "H45NMngr201") {
      this.params = this.params;
      this.params.type = this.alertsParams.statusSuccess;
      this.params.msg = this.alertsParams.msgSuccess;
      this.showAlert = true;
      this.form();
      this.router.navigate(["/"]);
    } else {
      this.params.type = this.alertsParams.statusDanger;
      this.params.msg = this.alertsParams.msgDanger;
      this.showAlert = true;
      console.log("erro");
      console.log(this.showAlert);
      this.form();
      
    }
    console.log('clicado');
  }


  public onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    !this.showAlert;
    this.form();
    
  }

  public populateForm() {
    this.loginForm.patchValue({
      userName: "UserMaster",
      password: "H45NMngr201"
    })
  }

}
