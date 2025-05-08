import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderMenuItemComponent } from './sider-menu-item.component';

describe('SiderMenuItemComponent', () => {
  let component: SiderMenuItemComponent;
  let fixture: ComponentFixture<SiderMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiderMenuItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SiderMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
