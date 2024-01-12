import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDragStart, CdkDragMove, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Board } from '../models/board.model';
import { Column } from '../models/column.model';
import { Task } from '../models/task.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {

  board: Board = new Board('Développement', '💻',[
    new Column(
    'Ideas',
    [
      new Task([
        { text: 'Get to work', icon: '🚧' },
        { text: 'Pick up groceries', icon: '🫐' },
        { text: 'Go home', icon: '🏠' },
        { text: 'Fall asleep', icon: '💤' }
      ])
    ],
    'gray'
    ),
    new Column('Todo',
    [
      new Task([
        { text: 'Get up', icon: '🛏️' },
        { text: 'Brush teeth', icon: '🪥' },
        { text: 'Take a shower', icon: '🚿' },
        { text: 'Check e-mail', icon: '✉️' },
        { text: 'Walk dog', icon: '🐶' }
      ])
    ],
    'brown'),
    new Column('Done',
    [
      new Task([
        { text: 'Get up', icon: '🛏️' },
        { text: 'Brush teeth', icon: '🪥' },
        { text: 'Check e-mail', icon: '✉️' },
        { text: 'Walk dog', icon: '🐶' }
      ])
    ],
    'orange'),
    new Column('Done',
    [
      new Task([

      ])
    ],
    'yellow'),
    new Column('Done',
    [
      new Task([

      ])
    ],
    'green'),
    new Column('Done',
    [
      new Task([

      ])
    ],
    'blue'),
    new Column('Done',
    [
      new Task([

      ])
    ],
    'purple'),
    new Column('Done',
    [
      new Task([

      ])
    ],
    'pink'),
    new Column('Done',
    [
      new Task([

      ])
    ],
    'red')
  ]);

  @ViewChild('formInput',{static:false, read: ElementRef}) elRef;
  
  formValue: string = 'default';

  onFormSubmit(event: Event, form: NgForm, taskIndex: number, columnIndex: number) {
    const taskElement = (event.target as HTMLElement).closest('.task');
    const textElement = taskElement?.querySelector('.tasks-content-text');
    const formElement = taskElement?.querySelector('.tasks-content-form');
    const inputElement = taskElement?.querySelector('.tasks-content-input');

    const column = this.board.columns[columnIndex]
    const task = column.tasks[0]
    const content = task.content[taskIndex]

    // inputElement?.focus();

    textElement?.classList.remove('hidden');
    formElement?.classList.add('hidden');
    
    content.text = form.value.text
  }

  onEditClicked(event: Event, taskIndex: number, columnIndex: number) {
    const taskElement = (event.target as HTMLElement).closest('.task');
    const textElement = taskElement?.querySelector('.tasks-content-text');
    const formElement = taskElement?.querySelector('.tasks-content-form');

    const column = this.board.columns[columnIndex]
    const task = column.tasks[0]
    const content = task.content[taskIndex]

    textElement?.classList.add('hidden');
    formElement?.classList.remove('hidden');


    console.log(Element)
    console.log(formElement)


    this.formValue = content.text;
  }
  
  addEmoji(select: any) {
    var emoji = select.emoji.native;
    console.log(emoji);
    console.log(select);
    const panel = document.querySelector('.emoji-mart');
    panel!.classList.remove('visible');
  };

  emoTest() {
    const panel = (document.querySelector('.emoji-mart') as HTMLInputElement);
    panel!.classList.add('visible');
    console.log();
  };

  drop(event: CdkDragDrop<{ text: string; icon: string; }[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
