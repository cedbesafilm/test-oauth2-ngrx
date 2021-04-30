import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() isHandset: boolean = false;
  @Input() isAuthenticated: boolean | null = false;
  @Input() title: string = '';

  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter<void>();
  @Output() login: EventEmitter<void> = new EventEmitter<void>();
  @Output() logout: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
