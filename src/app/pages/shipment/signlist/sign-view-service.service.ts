import {Injectable, Type} from '@angular/core';
import {AddComponent} from './add/add.component';
import {SignViewItem} from './sign-view-item';
import {NoselectedComponent} from './noselected/noselected.component';
import {DetailComponent} from './detail/detail.component';

@Injectable({
  providedIn: 'root'
})
export class SignViewServiceService {


  getviews()  {
    const keys = [];

    keys[0] = new SignViewItem(AddComponent, '新增');
    keys[1] = new SignViewItem(DetailComponent, '明细');
    keys[2] = new SignViewItem(NoselectedComponent, '数据');

    return keys;
  }
}
