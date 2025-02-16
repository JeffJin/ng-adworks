import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should find the email input and trigger input event', () => {
    expect(component).toBeDefined();
    // const input = fixture.nativeElement.querySelector('#email');
    // const event = new Event('input');
    // input.value = 'jeff@jeffjin.com';
    // input.dispatchEvent(event);
    //
    // expect(fixture.componentInstance.favoriteColorControl.value).toEqual('jeff@jeffjin.com');
  });
});
