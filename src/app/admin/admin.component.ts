import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { EmitService } from '../help/emit-service';
import { AlertMessageType, EmitAlertMessage, MessageShowType } from '../help/emit-alert-message';
import { MessageComponent } from '../component/message';
import { AlertComponent } from './shared/alert.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { promise } from 'selenium-webdriver';
import { filter, map, mergeMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { NavigationService } from './navigation/navigation.service';
import { ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  layoutMode = false;
  customizerSidenavAlign = 'end';
  sidenavOpen = true;
  sidenavMode = 'side';
  sidenavAlign = 'start';

  alertmessage = null;


  @ViewChild('alert', {static: false})
  public alertcom: AlertComponent;


  @ViewChild('toasttype', {static: false})
  public toastObj: ToastComponent;

  public toasts: { [key: string]: Object }[] = [
    { title: '警告!', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
    { title: '成功!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
    { title: '错误!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
    { title: '消息!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }
  ];

  navLinks: Array<{ title: string, module: string, power: string, isSelect: boolean }> = [];

  currentIndex = -1;

  public position: object = { X: 'Right' };

  constructor(public emitService: EmitService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title, public navigationService: NavigationService) {


    // 初始化的时候把首页添加进来

    // if (this.currentIndex === -1) {
    //
    //   this.navLinks.push({ title: '首页', module: '/home', power: '', isSelect: true });
    // }
    //
    //
    //
    // this.router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd),
    //   map(() => this.activatedRoute),
    //   map(route => {
    //     while (route.firstChild) {
    //       route = route.firstChild;
    //     }
    //     return route;
    //   }),
    //   filter(route => route.outlet === 'primary'),
    //   mergeMap(route => route.data)
    // )
    //   .subscribe((event) => {
    //     // 路由data的标题
    //     // const menu = {...event};
    //
    //     // console.log(this.router.data);
    //
    //     // MulipageReuseStrategy.handlers;
    //
    //     let title = this.titleService.getTitle();
    //
    //     if (title === '川大物流联盟') {
    //       return;
    //     }
    //     if (title.length === 0) {
    //
    //       title = this.router.url;
    //     }
    //
    //
    //     //  alert(this.router.url);
    //
    //     // const  menux=this.navigationService.findNavigationItemByUrl(this.router.url);
    //
    //     //  console.log(menux);
    //
    //     const menu = { title: title, module: this.router.url, power: event['power'], isSelect: true };
    //
    //
    //     const exitMenu = this.navLinks.find(info => info.module === menu.module);
    //     if (!exitMenu) {// 如果不存在那么不添加，
    //       this.navLinks.push(menu);
    //     }
    //     this.currentIndex = this.navLinks.findIndex(p => p.module === this.router.url);
    //   });

  }

  ngOnInit() {
    // 接收发射过来的数据
    this.emitService.eventEmit.subscribe((value: EmitAlertMessage) => {
      // if(value.MessageType==AlertMessageType.) {
      // 这里就可以调取接口，刷新userList列表数据
      if (value.Message !== undefined) {
        console.log(value);
        // this.alertmessage = value;

        // alert(value.Message);
        console.log(value);
        if (value.ShowType === MessageShowType.Alert) {
          this.alertcom.show(value);
        } else {
          let selectmodel;
          switch (value.MessageType) {
            case AlertMessageType.Error:
              selectmodel = this.toasts[2];
              break;
            case AlertMessageType.Info:
              selectmodel = this.toasts[3];
              break;
            case AlertMessageType.Succeed:
              selectmodel = this.toasts[1];
              break;
          }
          selectmodel.title = value.Title;
          selectmodel.content = value.Message;
          this.toastObj.show(selectmodel);
        }

      }
    });

  }

  /**
   * @param event {Event} 事件
   * @param scrollContainer {Object} 容器dom
   */
  onActivate(event, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }


  /**
   * 关闭页面
   * @param title
   */
  closeurl(title: string) {

    if (this.navLinks.length === 1) {
      return;
    }

    const pageindex = this.navLinks.findIndex(t => t.title === title);

    const pagemodel = this.navLinks.find(t => t.title === title);

    // if (pageindex !== -1) {
    //   MulipageReuseStrategy.deleteRouteSnapshot(pagemodel.module);
    //   this.navLinks.splice(pageindex, 1);
    // }
    //  if (pageindex!=-1 ){
    //
    //
    //    this.navLinks.splice(pageindex, 1);
    //
    //
    //
    //    //this.selected.setValue(this.navLinks - 1);
    //    /
    // }

  }
}
