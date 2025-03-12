import { Component } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { CommonModule } from "@angular/common"
import { AuthService } from "../../Services/auth.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  username = ""
  password = ""
  errorMessage = ""

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    // Si el usuario ya está autenticado, redirigir a home
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/home"])
    }
  }

  login() {
    if (this.username && this.password) {
      const success = this.authService.login(this.username, this.password)
      if (success) {
        this.router.navigate(["/home"])
      } else {
        this.errorMessage = "Credenciales inválidas"
      }
    } else {
      this.errorMessage = "Por favor ingresa usuario y contraseña"
    }
  }
}

