import { Component, type OnInit } from "@angular/core"
import { Router, RouterOutlet, RouterModule, NavigationEnd } from "@angular/router"
import { CommonModule } from "@angular/common"
import { filter } from "rxjs/operators"
import { AuthService } from "./Services/auth.service"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "myapp"
  showHeader = false
  isLoggedIn = false

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    // Suscribirse a los eventos de navegación para determinar si mostrar el header
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      // Ocultar el header en la ruta de login
      this.showHeader = !event.url.includes("/login")
    })
  }

  ngOnInit() {
    // Suscribirse al estado de autenticación
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn
    })
  }

  logout() {
    this.authService.logout()
  }
}

