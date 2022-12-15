import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers : [DataService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should return the city'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.getCity({city : "Delhi"})).toEqual(`Residing at Delhi`);
  });

  it(`should return the city not found'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.getCity({})).toEqual(`No city specified`);
  });

  it(`should return empty list of users'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(DataService);
    spyOn(service,"fetchUsersData").and.callFake(() => {
      return of([]);
    });
    app.getData();
    expect(app.users).toEqual([]);
  });


  it(`should return list of users'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(DataService);
    spyOn(service,"fetchUsersData").and.callFake(() => {
      return of([{city:"Delhi",address:"New Delhi"}]);
    });
    app.getData();
    expect(app.users.length).toEqual(1);
  });

 
});
