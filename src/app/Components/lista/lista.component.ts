import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { ShowService } from "../../Services/show.service"

@Component({
  selector: "app-lista",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./lista.component.html",
  styleUrls: ["./lista.component.css"],
})
export class ListaComponent implements OnInit {
  // Lista de mantenimientos
  mantenimientos: any[] = []

  // Control del modal y campos de entrada
  showModal = false
  titulo = ""
  descripcion = ""
  estado = "Activo"
  fechaCreacion = ""
  responsable = "" // Nuevo campo para el responsable
  imgUrl: string | ArrayBuffer | null = null

  // Inyectar el servicio en el constructor
  constructor(private showService: ShowService) {}

  // Obtener los mantenimientos al iniciar el componente
  ngOnInit() {
    this.mantenimientos = this.showService.obtenerMantenimientos()
    // Establecer la fecha actual como valor predeterminado
    this.fechaCreacion = new Date().toISOString().split("T")[0]
  }

  // Función para abrir el modal
  abrirModal() {
    this.showModal = true
    // Establecer la fecha actual como valor predeterminado cada vez que se abre el modal
    this.fechaCreacion = new Date().toISOString().split("T")[0]
  }

  // Función para cerrar el modal
  cerrarModal() {
    this.showModal = false
    this.titulo = ""
    this.descripcion = ""
    this.estado = "Activo"
    this.responsable = "" // Limpiar el campo responsable
    this.imgUrl = null
    // Restablecer la fecha al valor actual
    this.fechaCreacion = new Date().toISOString().split("T")[0]
  }

  // Función para agregar el mantenimiento a la lista
  agregarMantenimiento() {
    if (this.titulo && this.descripcion) {
      const nuevoMantenimiento = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        estado: this.estado,
        fechaCreacion: this.fechaCreacion,
        responsable: this.responsable, // Incluir el responsable en el objeto
        imgUrl: this.imgUrl,
      }

      // Llamamos al servicio para agregar el mantenimiento
      this.showService.agregarMantenimiento(nuevoMantenimiento)
      this.mantenimientos = this.showService.obtenerMantenimientos()
      this.cerrarModal()
    }
  }

  // Función para manejar la carga de la imagen
  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.imgUrl = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  // Función para eliminar el mantenimiento
  eliminarMantenimiento(mantenimiento: any) {
    this.showService.eliminarMantenimiento(mantenimiento)
    this.mantenimientos = this.showService.obtenerMantenimientos()
  }

  // Función para formatear la fecha para mostrar
  formatDate(dateString: string): string {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
}

