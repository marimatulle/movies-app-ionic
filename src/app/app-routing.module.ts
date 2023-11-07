import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./view/movie/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./view/movie/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'details',
    loadChildren: () =>
      import('./view/movie/details/details.module').then((m) => m.DetailsPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./view/user/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./view/user/signin/signin.module').then( m => m.SigninPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
