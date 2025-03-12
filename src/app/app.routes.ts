import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ListaComponent } from './Components/lista/lista.component';

export const routes: Routes = [
    {path: '',
        loadComponent: () => import('./Components/home/home.component').then(m => m.HomeComponent)
      },
  {path: 'home',
    loadComponent: () => import('./Components/home/home.component').then(m => m.HomeComponent)
  },
  {path: 'lista',
    loadComponent: () => import('./Components/lista/lista.component').then(m => m.ListaComponent)
  },
  {path: '**',
    redirectTo:'',
    pathMatch:'full'
  },
];
