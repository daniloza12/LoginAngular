import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule], // Agregar `HttpClientModule`
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private http: HttpClient) {}
  //private loginUrl = 'https://run.mocky.io/v3/f3868f6b-ce82-48c3-9f9d-2306496dbd7a'; // Cambia esto por la URL de tu API de login
  private loginUrl = 'http://localhost:8082/v1/clientes/login'; // Cambia esto por la URL de tu API de login



  isLoginView: boolean=true;

  userRegisterObj: any={
    userName:'',
    password:'',
    emailId:''
  }

  userLogin: any = {
    userName:'',
    password:'',
  }

  router = inject(Router);

  onRegister(){

    debugger;
    const isLocalData = localStorage.getItem("angular18Local");
    if(isLocalData != null){
      const localArray = JSON.parse(isLocalData);
      localArray.push(this.userRegisterObj);
      localStorage.setItem("angular18Local",JSON.stringify(localArray))

    } else {
      const localArray = [];
      localArray.push(this.userRegisterObj);
      localStorage.setItem("angular18Local",JSON.stringify(localArray))
    }

    alert("Registration Sucess");
  }

  /* 
  onLogin(){
    debugger;
    const isLocalData = localStorage.getItem("angular18Local");
    if(isLocalData != null){
      const users = JSON.parse(isLocalData);
      const isUserFound = users.find(( m:any )=> m.userName == this.userLogin.userName && m.password == this.userLogin.password )      
      this.onLoginBackend();
      if(isUserFound != undefined){
        this.router.navigateByUrl('dashboard')
      }else{
        alert ("User name or password is Wrong")
      }
    }else{
      alert("No User Found")
    }
  } */

  onLogin(){
    debugger;
    this.login(this.userLogin.userName, this.userLogin.password).subscribe(
      response => {
        //const usuario = response.usuario;
        //const rol = response.rol; 
        console.log('Login exitoso!', response);
        // Aquí puedes guardar el token de respuesta, redirigir, etc.
        this.router.navigateByUrl('dashboard')
      },
      error => {
        console.error('Error en el login', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    );
  }

  login(correo: string, password: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Establece el tipo de contenido como JSON
      'Authorization': 'Bearer tu-token-aqui',  // Puedes incluir tu token si es necesario
     });
     const options = { headers };

    // Si el API acepta un payload JSON
    const body = { correo, password };

    return this.http.post(this.loginUrl, body, options);
  }
}
