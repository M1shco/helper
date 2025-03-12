import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule para usar ngIf, ngFor, ngClass
import { FormsModule } from '@angular/forms';    // Importa FormsModule para usar ngModel
import { ShowService } from '../../Services/show.service';

@Component({
  selector: 'app-lista',
  standalone: true, // Indica que este componente es standalone
  imports: [CommonModule, FormsModule], // Agrega los módulos necesarios aquí
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  // Lista de mantenimientos
  mantenimientos: any[] = [];

  // Control del modal y campos de entrada
  showModal: boolean = false;
  titulo: string = '';
  descripcion: string = '';
  estado: string = 'Activo'; // Estado predeterminado
  imgUrl: string | ArrayBuffer | null = null; // Para almacenar la URL de la imagen

  // Inyectar el servicio en el constructor
  constructor(private showService: ShowService) { }

  // Obtener los mantenimientos al iniciar el componente
  ngOnInit() {
    this.mantenimientos = this.showService.obtenerMantenimientos();
  }

  // Función para abrir el modal
  abrirModal() {
    this.showModal = true;
  }

  // Función para cerrar el modal
  cerrarModal() {
    this.showModal = false;
    this.titulo = '';
    this.descripcion = '';
    this.estado = 'Activo';
    this.imgUrl = null; // Limpiar la imagen seleccionada
  }

  // Función para agregar el mantenimiento a la lista
  agregarMantenimiento() {
    if (this.titulo && this.descripcion) {
      const nuevoMantenimiento = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        estado: this.estado,
        imgUrl: this.imgUrl // Guardar la URL de la imagen
      };

      // Llamamos al servicio para agregar el mantenimiento
      this.showService.agregarMantenimiento(nuevoMantenimiento);
      this.mantenimientos = this.showService.obtenerMantenimientos(); // Actualizar la lista
      this.cerrarModal(); // Cerrar el modal después de agregar
    }
  }

  // Función para manejar la carga de la imagen
  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgUrl = e.target.result; // Asignar la imagen al modelo
      };
      reader.readAsDataURL(file); // Convertir la imagen a una URL base64
    }
  }

  // Función para eliminar el mantenimiento
  eliminarMantenimiento(mantenimiento: any) {
    this.showService.eliminarMantenimiento(mantenimiento); // Eliminar mantenimiento del servicio
    this.mantenimientos = this.showService.obtenerMantenimientos(); // Actualizar la lista
  }
}
