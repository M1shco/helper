import type { Routes } from "@angular/router"
import { AuthGuard } from "./guards/auth.guard"

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "home",
    loadComponent: () => import("./Components/home/home.component").then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "lista",
    loadComponent: () => import("./Components/lista/lista.component").then((m) => m.ListaComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    loadComponent: () => import("./Components/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "**",
    redirectTo: "login",
    pathMatch: "full",
  },
]

