import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model'
import { DataService } from '../shared/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit{

  todos : Todo[]
  showValidationErrors: boolean

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()
  }

  onFormSubmit(form: NgForm) {
    if(form.invalid) return this.showValidationErrors = true
    
    console.log("FORM SUBMITTED")
    console.log(form)
    

    this.dataService.addTodo(new Todo(form.value.text))
  }
}
