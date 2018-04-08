import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './views/user/login/login.component';
import {ProductListComponent} from './views/product/product-list/product-list.component';
import {ProductNewComponent} from './views/product/product-new/product-new.component';
import {ProductListBusinessComponent} from './views/product/product-list-business/product-list-business.component';
import {ProductDetailComponent} from './views/product/product-detail/product-detail.component';
import {ProductEditComponent} from './views/product/product-edit/product-edit.component';
<<<<<<< HEAD
import {ReviewListComponent} from "./views/review/review-list/review-list.component";
import {ReviewNewComponent} from "./views/review/review-new/review-new.component";
import {AuthGuard} from "./services/auth-guard.service";
=======
import {AuthGuard} from './services/auth-gaurd.service';
>>>>>>> 7ebe86a6328fc0c930aceebaf64666adbd24a779

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'product', component: ProductListComponent},
  {path: 'product/:productId', component: ProductDetailComponent},
<<<<<<< HEAD
  {path: 'user/:userId/product/:productId/edit', component: ProductEditComponent},
  {path: 'product/:productId/review', component: ReviewListComponent},
  {path: 'product/:productId/review/new', component: ReviewNewComponent, canActivate: [AuthGuard]}
=======
  {path: 'user/product', component: ProductListBusinessComponent, canActivate: [AuthGuard]},
  {path: 'user/product/new', component: ProductNewComponent, canActivate: [AuthGuard]},
  {path: 'user/product/:productId/edit', component: ProductEditComponent, canActivate: [AuthGuard]}
>>>>>>> 7ebe86a6328fc0c930aceebaf64666adbd24a779
];

export const routing = RouterModule.forRoot(appRoutes);
