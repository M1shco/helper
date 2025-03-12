import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { Router } from "@angular/router"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this.isLoggedInSubject.asObservable()

  constructor(private router: Router) {
    // Verificar si hay un estado de sesión guardado al iniciar
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    this.isLoggedInSubject.next(loggedIn)
  }

  login(username: string, password: string): boolean {
    // Aquí implementarías la lógica real de autenticación
    // Por ahora, simplemente aceptamos cualquier combinación de usuario/contraseña
    if (username && password) {
      this.isLoggedInSubject.next(true)
      localStorage.setItem("isLoggedIn", "true")
      return true
    }
    return false
  }

  logout(): void {
    this.isLoggedInSubject.next(false)
    localStorage.removeItem("isLoggedIn")
    this.router.navigate(["/login"])
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value
  }
}

