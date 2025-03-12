import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private mantenimientos: any[] = [];  // Lista de mantenimientos

  constructor() { }

  // Función para obtener los mantenimientos
  obtenerMantenimientos() {
    return [...this.mantenimientos];  // Devuelve una copia de la lista
  }

  // Función para agregar un nuevo mantenimiento
  agregarMantenimiento(mantenimiento: any) {
    this.mantenimientos.push(mantenimiento);
  }

  // Función para eliminar un mantenimiento
  eliminarMantenimiento(mantenimiento: any) {
    // Filtra el mantenimiento de la lista, eliminando el que coincide con el mantenimiento a eliminar
    this.mantenimientos = this.mantenimientos.filter(m => m !== mantenimiento);
  }
}
