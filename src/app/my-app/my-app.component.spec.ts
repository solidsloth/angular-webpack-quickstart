import { TestBed } from '@angular/core/testing';
import { MyAppComponent } from './my-app.component';
describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [MyAppComponent]});
  });
  it ('should work', () => {
    let fixture = TestBed.createComponent(MyAppComponent);
    expect(fixture.componentInstance instanceof MyAppComponent).toBe(true, 'should create AppComponent');
  });
});
