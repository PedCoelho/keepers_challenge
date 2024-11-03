import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultPageComponent } from './default-page.component';

describe('DefaultPageComponent', () => {
  let component: DefaultPageComponent;
  let fixture: ComponentFixture<DefaultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
