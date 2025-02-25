import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../provider/post-provider';  
import { ToastController } from '@ionic/angular';
@Component({
 selector: 'app-tab3',
 templateUrl: './tab3.page.html',
 styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
 pendonor: any = [];
 limit: number = 10;
 start: number = 0;
 constructor(
 private postPvdr: PostProvider,
 public toastController: ToastController,
 ) { }
 ngOnInit() {
 }
 ionViewWillEnter() {
 this.pendonor = [];
 this.start = 0;
 this.loadPendonor();
 }
 doRefresh(event: any) {
  setTimeout(() => {
  this.ionViewWillEnter();
  event.target.complete();
  }, 500);
  }
  loadData(event: any) {
  this.start += this.limit;
  setTimeout(() => {
  this.loadPendonor().then(() => {
  event.target.complete();
  });
  }, 500);
  }
  loadPendonor() {
    return new Promise(resolve => {
    let body = {
    aksi: 'get_pendonor',
    limit : this.limit,
    start : this.start,
    };
    this.postPvdr.postData(body, 'action.php').subscribe(data => {
    for (let pendonor of data.result) {
    this.pendonor.push(pendonor);
    }
    resolve(true);
    });
    });
    }
   }