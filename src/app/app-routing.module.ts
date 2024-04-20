import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./features/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'person',
    loadChildren: () =>
      import('./features/person/person.module').then((m) => m.PersonModule),
    data: { preload: true },
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
