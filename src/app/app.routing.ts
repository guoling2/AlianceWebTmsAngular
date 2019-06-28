import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import {AuthorizationGuard} from './auth/guard/authorization.guard';


// const routes: Routes = [
//   { path: '', redirectTo: '/pages/blog', pathMatch: 'full' },
//   { path: 'home', loadChildren: './home/home.module#HomeModule' },
//   {
//     path: '',
//     component: AdminComponent,
//     children: [
//       {
//         path: 'apps/navigation',
//         loadChildren: './navigation/navigation.module#NavigationModule'
//       },
//       { path: 'apps/chats', loadChildren: './chats/chats.module#ChatsModule' },
//       { path: 'apps/mail', loadChildren: './mail/mail.module#MailModule' },
//       {
//         path: 'apps/todo/:filter',
//         loadChildren: './todo/todo.module#TodoModule'
//       },
//       { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
//       { path: 'forms', loadChildren: './forms/forms.module#FormModule' },
//       {
//         path: 'materials',
//         loadChildren: './materials/materials.module#MaterialsModule'
//       },
//       { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
//       {
//         path: 'components/chart',
//         loadChildren: './chart/chart.module#ChartModule'
//       },
//       {
//         path: 'analysis',
//         loadChildren: './analysis/analysis.module#AnalysisModule'
//       },
//       { path: 'crm', loadChildren: './crm/crm.module#CrmModule' },
//       { path: 'apm', loadChildren: './apm/apm.module#ApmModule' },
//       {
//         path: 'pages-layouts',
//         loadChildren: './pages-layouts/pages-layouts.module#PageLayoutsModule'
//       }
//     ]
//   }
// ];

const routes: Routes = [

  { path: '', loadChildren: './auth/auth-routing.module#AuthRoutingModule' },
  {
    path: 'biz',
    canActivate: [AuthorizationGuard],
    component: AdminComponent,
    children: [
      { path: 'home', loadChildren: './pages/home/home.module#HomeModule' },
      { path: 'weixinorder', loadChildren: './pages/weixinorder/weixinorder.module#WeixinOrderModule' },
      { path: 'myorder', loadChildren: './pages/myorder/logistcimyorder.module#LogistcimyorderModule' },
      { path: 'shipment', loadChildren: './pages/shipment/shipment.module#ShipmentModule' },
      { path: 'delegateorders', loadChildren: './pages/delegateorder/delegateorder.module#DelegateorderModule' },
      { path: 'orderserver', loadChildren: './pages/track/track.module#TrackModule' },
      { path: 'base', loadChildren: './pages/base/bizbase.module#BizBaseModuleModule' },
      { path: 'user-management', loadChildren: './pages/usermanagement/user-management.module#UserManagementModule' },
      { path: 'customer-management', loadChildren: './pages/logisticcustomer/customer-management.module#CustomerManagementModule' }
    ]
  },
  {
    path: 'customer',
    canActivate: [AuthorizationGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: './pages/customer/customer.module#CustomerModuleModule'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
