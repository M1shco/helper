import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Importar RouterOutlet
import { RouterModule } from '@angular/router';  // Importar RouterModule
import { routes } from './app.routes';  // Importar las rutas definidas

@Component({
  selector: 'app-root',
  standalone: true,  // Indicar que es un componente standalone
  imports: [RouterOutlet, RouterModule],  // Incluir RouterModule para manejar las rutas
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';
}
