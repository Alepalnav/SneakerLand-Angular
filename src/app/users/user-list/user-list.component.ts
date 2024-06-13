import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  users: User[] = [];
  filteredUsers: User[] = [];
  filterId: number | null = null;
  filterUsername: string = '';
  filterEmail: string = '';
  sortColumn: string = ''; // Columna de orden actual
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección de orden: ascendente o descendente

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
        this.applyFilters(); // Aplicar filtros por defecto al inicio
      }
    );
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user =>
      (this.filterId === null || user.id === this.filterId) &&
      (this.filterUsername === '' || user.username.toLowerCase().includes(this.filterUsername.toLowerCase())) &&
      (this.filterEmail === '' || user.email.toLowerCase().includes(this.filterEmail.toLowerCase()))
    );
    this.sortUsers(); // Aplicar orden después de aplicar filtros
  }

  clearFilters(): void {
    this.filterId = null;
    this.filterUsername = '';
    this.filterEmail = '';
    this.applyFilters();
  }

  sortUsers(column: string = 'id'): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Ordenar los usuarios
    this.filteredUsers.sort((a, b) => {
      const aValue = this.getSortValue(a, column);
      const bValue = this.getSortValue(b, column);

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getSortValue(user: User, column: string): any {
    switch (column) {
      case 'id':
        return user.id;
      case 'username':
        return user.username.toLowerCase();
      case 'email':
        return user.email.toLowerCase();
      default:
        return null;
    }
  }

}
