import { TestBed } from '@angular/core/testing';
import { PageTitleStrategyService } from './page-title-strategy.service';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot } from '@angular/router';
import packageJson from './../../../../../package.json';

describe('PageTitleStrategyService', () => {
  let service: PageTitleStrategyService;
  let titleServiceMock: jasmine.SpyObj<Title>;

  beforeEach(() => {
    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);

    TestBed.configureTestingModule({
      providers: [
        PageTitleStrategyService,
        { provide: Title, useValue: titleSpy }
      ]
    });

    service = TestBed.inject(PageTitleStrategyService);
    titleServiceMock = TestBed.inject(Title) as jasmine.SpyObj<Title>;
  });

  it('debe crear el servicio correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe actualizar el título de la página correctamente', () => {
    const mockRouterStateSnapshot = {
      root: {
        firstChild: {
          data: { title: 'Página de prueba' }
        }
      }
    } as unknown as RouterStateSnapshot;

    service.updateTitle(mockRouterStateSnapshot);

    expect(titleServiceMock.setTitle).toHaveBeenCalledWith('Página de prueba | ' + packageJson.displayName);
  });

  it('no debe actualizar el título si el título es indefinido', () => {
    const mockRouterStateSnapshot = {} as RouterStateSnapshot;

    spyOn(service, 'buildTitle').and.returnValue(undefined);

    service.updateTitle(mockRouterStateSnapshot);

    expect(titleServiceMock.setTitle).not.toHaveBeenCalled();
  });
});
