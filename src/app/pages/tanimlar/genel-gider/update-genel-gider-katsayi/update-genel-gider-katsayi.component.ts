import { Component, Input, OnInit } from '@angular/core';
import { StokService } from 'src/app/core/services/repository/stok.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GenelGiderService } from 'src/app/core/services/repository/genel-gider.service';
import { GenelGiderKatsayiService } from 'src/app/core/services/repository/genel-gider-katsayi.service';

@Component({
  selector: 'app-update-genel-gider-katsayi',
  templateUrl: './update-genel-gider-katsayi.component.html',
  styleUrls: ['./update-genel-gider-katsayi.component.scss']
})
export class UpdateGenelGiderKatsayiComponent implements OnInit {
  @Input() data: any;

  constructor(
    private GenelGiderKatsayiService: GenelGiderKatsayiService,
    public activeModal: NgbActiveModal,
    private genelGiderKatsayiService:GenelGiderKatsayiService

  ) { }
  katsayilarArray: any = []
  genelGiderKatsayi:any;
  selectedDialogRowEvent:any;
 async ngOnInit() {
    this.genelGiderKatsayi = (await this.GenelGiderKatsayiService.GetAll()).items

    var test = this.data['katsayilar'];
    const turler = new Set();
    this.genelGiderKatsayi.forEach(obj => { turler.add(obj.tur); });
    const benzersizTurler:any = [...turler];
    this.katsayilarArray = [];


    benzersizTurler.forEach(element => {
      if (test[`${element}`]) {
         var updated=test[`${element}`]
         updated.turUpdate=updated.tur.charAt(0).toUpperCase() + updated.tur.slice(1);
         if ( updated.turUpdate === "Suspansiyon") {
          updated.turUpdate = "Süspansiyon";
        }
        if ( updated.turUpdate === "MakineSasesi") {
          updated.turUpdate = "Makine Şasesi";
        }
          if ( updated.turUpdate === "Kapi") {
            updated.turUpdate = "Kapı";
        }
        this.katsayilarArray.push(test[`${element}`]);
      }
    });




    
    

  }

  updateDeger(event){
     var createModel= {
      id: event.id,
      ad: event.ad,
      fabrika: event.fabrika,
      tur: event.tur,
      deger: event.deger,


    }


    this.GenelGiderKatsayiService.update(
      createModel,
      async () => {
       
      }, (errorMessage) => { }
    );
  }




  cikis() {
    this.activeModal.close(false);
  }



  frm: any = {}











  selectedFabrika: any;
  fabrika = [
    { ad: 'Kapı Fabrikası' },
    { ad: 'Kabin Fabrikası' },
    { ad: 'Motor Fabrikası' },

  ]
  onFabrikaChange(item: any): void {
    this.selectedFabrika = item;
  };



  selectedGider: any;
  gider = [
    { ad: 'BAKIM-ONARIM GİDERİ' },
    { ad: 'DOĞALGAZ GİDERİ' },
    { ad: 'ELEKTRİK' },
    { ad: 'SERVİS GİDERİ' },
    { ad: 'YEMEK GİDERİ' },
    { ad: 'İNTERNET-TELEFON GİDERİ' },
    { ad: 'KIRTASİYE GİDERİ' },
  ]
  onGiderChange(item: any): void {
    this.selectedGider = item;
  };









}
