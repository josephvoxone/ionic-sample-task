import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./page/signin/signin.module').then((m) => m.SigninPageModule),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./page/welcome/welcome.module').then((m) => m.WelcomePageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./page/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./page/users/users.module').then((m) => m.UsersPageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
