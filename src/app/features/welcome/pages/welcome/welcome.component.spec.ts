import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      imports: [SharedModule],
    });
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all button harnesses', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttons.length).toBe(1);
  });

  it('deve encontrar e testar o botão de acesso à página de informações de pessoa', async () => {
    const buttons = await loader.getAllHarnesses(MatButtonHarness);
    const personAccessButton = await buttons.find(async (button: MatButtonHarness) => {
      const buttonText = await button.getText();
      return buttonText === 'person access';
    });
    expect(personAccessButton).toBeTruthy();
    await personAccessButton!.click();
    const buttonElement = await personAccessButton!.host();
    const routerLink = await buttonElement.getAttribute('routerLink');
    expect(routerLink).toBe('/person-information');
    const routerLinkActive = await buttonElement.getAttribute('routerLinkActive');
    expect(routerLinkActive).toBe('active');
    const ariaCurrentWhenActive = await buttonElement.getAttribute('ariaCurrentWhenActive');
    expect(ariaCurrentWhenActive).toBe('page');
  });
});
