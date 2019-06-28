import {
  RouteReuseStrategy,
  DefaultUrlSerializer,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  PRIMARY_OUTLET,
  Route
} from '@angular/router';
// export class MulipageReuseStrategy implements RouteReuseStrategy {
//   public static handlers: { [key: string]: DetachedRouteHandle } = {};
//   private static waitDelete: string;
//
//   /** 表示对所有路由允许复用 如果你有路由不想利用可以在这加一些业务逻辑判断 */
//   public shouldDetach(route: ActivatedRouteSnapshot): boolean {
//     console.log(route);
//     return true;
//   }
//
//   /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
//   public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
//     if (MulipageReuseStrategy.waitDelete && MulipageReuseStrategy.waitDelete === this.getRouteUrl(route)) {
//       // 如果待删除是当前路由则不存储快照
//       MulipageReuseStrategy.waitDelete = null;
//       return;
//     }
//     MulipageReuseStrategy.handlers[this.getRouteUrl(route)] = handle;
//   }
//
//   /** 若 path 在缓存中有的都认为允许还原路由 */
//   public shouldAttach(route: ActivatedRouteSnapshot): boolean {
//     return !!MulipageReuseStrategy.handlers[this.getRouteUrl(route)];
//   }
//
//   /** 从缓存中获取快照，若无则返回nul */
//   public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
//     if (!route.routeConfig) return null;
//     if (route.routeConfig.loadChildren) return null;
//     return this.handlers[route.routeConfig.path];
//
//     if (!route.routeConfig) {
//       return null;
//     }
//
//     return MulipageReuseStrategy.handlers[this.getRouteUrl(route)];
//   }
//
//   /** 进入路由触发，判断是否同一路由 */
//   public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
//     return future.routeConfig === curr.routeConfig &&
//       JSON.stringify(future.params) === JSON.stringify(curr.params);
//   }
//
//   private getRouteUrl(route: ActivatedRouteSnapshot) {
//     return route['_routerState'].url.replace(/\//g, '_');
//   }
//
//   public static deleteRouteSnapshot(url: string): void {
//     const key = url.replace(/\//g, '_');
//     if (MulipageReuseStrategy.handlers[key]) {
//       delete MulipageReuseStrategy.handlers[key];
//     } else {
//       MulipageReuseStrategy.waitDelete = key;
//     }
//   }
// }
export class MulipageReuseStrategy extends RouteReuseStrategy {
  handlers: {[path: string]: DetachedRouteHandle} = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Avoid second call to getter
    let config: Route = route.routeConfig;
    // Don't store lazy loaded routes
    return config && !config.loadChildren;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    let path: string = this.getRoutePath(route);
    this.handlers[path] = handle;
    /*
      This is where we circumvent the error.
      Detached route includes nested routes, which causes error when parent route does not include the same nested routes
      To prevent this, whenever a parent route is stored, we change/add a redirect route to the current child route
    */
    let config: Route = route.routeConfig;
    if (config) {
      let childRoute: ActivatedRouteSnapshot = route.firstChild;
      let futureRedirectTo = childRoute ? childRoute.url.map(function(urlSegment) {
        return urlSegment.path;
      }).join('/') : '';
      const childRouteConfigs: Route[] = config.children;
      if(childRouteConfigs) {
        let redirectConfigIndex: number;
        let redirectConfig: Route = childRouteConfigs.find(function(childRouteConfig, index) {
          if(childRouteConfig.path === '' && !!childRouteConfig.redirectTo) {
            redirectConfigIndex = index;
            return true;
          }
          return false;
        });
        // Redirect route exists
        if(redirectConfig) {
          if(futureRedirectTo !== '') {
            // Current activated route has child routes, update redirectTo
            redirectConfig.redirectTo = futureRedirectTo;
          } else {
            // Current activated route has no child routes, remove the redirect (otherwise retrieval will always fail for this route)
            childRouteConfigs.splice(redirectConfigIndex, 1);
          }
        } else if(futureRedirectTo !== '') {
          childRouteConfigs.push({
            path: '',
            redirectTo: futureRedirectTo,
            pathMatch: 'full'
          });
        }
      }
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!this.handlers[this.getRoutePath(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    let config: Route = route.routeConfig;
    // We don't store lazy loaded routes, so don't even bother trying to retrieve them
    if(!config || config.loadChildren) {
      return false;
    }
    return this.handlers[this.getRoutePath(route)];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  getRoutePath(route: ActivatedRouteSnapshot): string {
    let namedOutletCount: number = 0;
    return route.pathFromRoot.reduce((path, route) => {
      let config: Route = route.routeConfig;
      if(config) {
        if(config.outlet && config.outlet !== PRIMARY_OUTLET) {
          path += `(${config.outlet}:`;
          namedOutletCount++;
        } else {
          path += '/';
        }
        return path += config.path
      }
      return path;
    }, '') + (namedOutletCount ? new Array(namedOutletCount + 1).join(')') : '');
  }
}
