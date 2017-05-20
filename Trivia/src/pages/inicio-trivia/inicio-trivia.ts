import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Vibration } from '@ionic-native/vibration';
import { Resultados } from '../../pages/resultados/resultados';
import { LoadingController } from 'ionic-angular';



/**
 * Generated class for the InicioTrivia page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inicio-trivia',
  templateUrl: 'inicio-trivia.html',
})
export class InicioTrivia {
    pregunta:string;
    respuesta1:string;
    respuesta2:string;
    respuesta3:string; 
    flag:number;
    v:number;
    usuario={
      nombre:'',
      puntaje:0,
      resElegida:[]
    };
  constructor(public navCtrl: NavController, public navParams: NavParams,private ntaudio: NativeAudio,private vibration:Vibration,public loadCtrl: LoadingController) {
    this.usuario.nombre=this.navParams.get('usuario');
    this.ntaudio.preloadSimple('correcto','assets/sonidos/correcto.mp3');
    this.ntaudio.preloadSimple('incorrecto','assets/sonidos/incorrecto.mp3');
   console.log("NAVCONSTRUCTOR:"+ this.usuario.nombre);
}
     
  ionViewDidLoad() {
    
    console.log('PARAMETROS'+this.usuario.nombre);
    this.pregunta="¿EN QUE AÑO FUE LA SEGUNDA GUERRA MUNDIAL?";
    this.respuesta1="1945";
    this.respuesta2="1980";
    this.respuesta3="1930";
    this.flag=0;
    this.v=0;
              
  }
  respuesta(r){
  if(r==1 && this.v==0){
    this.usuario.puntaje=this.usuario.puntaje+10;
     this.usuario.resElegida.push(this.respuesta1);                 
     this.ntaudio.play('correcto', () => console.log('correcto play'));
     this.vibration.vibrate(800);
     this.aPregunta2();
   }
  if(r==2 && this.v==0){
     this.usuario.resElegida.push(this.respuesta2);
     this.ntaudio.play('incorrecto', () => console.log('incorrecto play'));
this.vibration.vibrate([300,100,300]);
     this.aPregunta2();
    }
 if(r==3  && this.v==0){
    this.usuario.resElegida.push(this.respuesta3);
  this.ntaudio.play('incorrecto', () => console.log('incorrecto play'));
   this.vibration.vibrate([300,100,300]);
   this.aPregunta2();
  }
   if(r==1 && this.v==1){
    this.usuario.puntaje=this.usuario.puntaje+10;
     this.usuario.resElegida.push(this.respuesta1);
          this.ntaudio.play('correcto', () => console.log('correcto play'));
this.vibration.vibrate(800);

   this.aPregunta3(); 
  }
   if(r==2 && this.v==1){
      this.usuario.resElegida.push(this.respuesta2);
  this.ntaudio.play('incorrecto', () => console.log('incorrecto play'));
this.vibration.vibrate([300,100,300]);
  this.aPregunta3();
  }
   if(r==3 && this.v==1){
      this.usuario.resElegida.push(this.respuesta3);
       this.ntaudio.play('incorrecto', () => console.log('incorrecto play'));
this.vibration.vibrate([300,100,300]);
       console.log("arrayres"+this.usuario.resElegida);

   this.aPregunta3();
  }
  if(r==1 && this.v==2){
    this.usuario.resElegida.push(this.respuesta1);
  this.ntaudio.play('incorrecto', () => console.log('incorrecto play'));
 this.vibration.vibrate([300,100,300]);
   this.irAresultados();
  }
   if(r==2 && this.v==2){
      this.usuario.resElegida.push(this.respuesta2);
  this.ntaudio.play('incorrecto', () => console.log('incorrecto play'));
 this.vibration.vibrate([300,100,300]);
     this.irAresultados();
  }
   if(r==3 && this.v==2){
        this.usuario.puntaje=this.usuario.puntaje+10;

      this.usuario.resElegida.push(this.respuesta3);
     this.ntaudio.play('correcto', () => console.log('correcto play'));
this.vibration.vibrate(800);

     this.irAresultados();


  }
   this.v=this.v+1;  
}
knljkn
   presentLoadingDefault(){
     let loading = this.loadCtrl.create({
    content: 'CARGANDO RESULTADOS...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 5000);

   }
 irAresultados(){
     this.presentLoadingDefault();
     setTimeout(() => {
               this.navCtrl.push(Resultados,{
       nombre:this.usuario.nombre,
       puntaje:this.usuario.puntaje,
       resElegida:this.usuario.resElegida 
    });
  }, 5000);
  
 }
 aPregunta2(){
    this.pregunta="¿QUE ES UN FOTON?";
    this.respuesta1="Una particula de luz";
    this.respuesta2="un atomo";
    this.respuesta3="un efecto electromagnetico";
    console.log(this.v);
 }
  aPregunta3(){
    this.pregunta="¿CADA CUANTO ES AÑO BISIESTO?";
    this.respuesta1="Cada 2 añps";
    this.respuesta2="Cada 9 años";
    this.respuesta3="Cada 4 años";
   

 }
 
}
