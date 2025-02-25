import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../provider/post-provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  nama: string = '';
  nik: string = '';
  goldar: string = '';
  email: string = '';
  no_hp: string = '';


  constructor(
    public toastController: ToastController,
    private postPvdr: PostProvider,
    private router: Router
  ) {

  }
  
  ngOnInit() {
  }

  async addpendonor() {
    if (this.nama == '') {
      const toast = await this.toastController.create({
        message: 'Nama lengkap harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.nik == '') {
      const toast = await this.toastController.create({
        message: 'NIK harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.goldar == '') {
      const toast = await this.toastController.create({
        message: 'Golongan darah harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.email == '') {
      const toast = await this.toastController.create({
        message: 'Email harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.no_hp == '') {
      const toast = await this.toastController.create({
        message: 'No HP/ Whatsapp harus di isi',
        duration: 2000
      });
      toast.present();

    } else {
      let body = {
        nama: this.nama,
        nik: this.nik,
        goldar: this.goldar,
        email: this.email,
        no_hp: this.no_hp,
        aksi: 'add_pendonor'
      };
      this.postPvdr.postData(body, 'action.php').subscribe(async data => {
        var alertpesan = data.msg;
        if (data.success) {
          const toast = await this.toastController.create({
            message: 'Penambahan Data Sukses.',
            duration: 2000
          });
          toast.present();
          setTimeout(() => {
            this.router.navigate(['/tabs/tab3']);
          }, 1000);
        }
      });

    }
  }

}
