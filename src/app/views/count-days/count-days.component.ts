import { CheckboxControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-count-days',
  templateUrl: './count-days.component.html',
  styleUrls: ['./count-days.component.scss']
})
export class CountDaysComponent implements OnInit {

  public countDaysForm: FormGroup = this.fb.group({});
  //datas
  public mostrarDatas: boolean = false;
  public dataHoje: Date = new Date();
  public dataAtualFuturo: string = '';
  public dataPassadoView: string = '';
  public mensagem: string = "";
  public dataPassado: any;
  public dia: number = 0;
  public mes: number = 0;
  public ano: number = 0;
  public diff: number = 0;

  //calculo
  public CALC_MES: number = 30.417;
  private restoDivisaoMes: any;
  private restoDivisaoDia: any;

  public secondDateCheck: any = '';
  public today: string = '';

  constructor(private fb: FormBuilder,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.form();
  }

  //inclui a data do dia ou remove!
  public todayCheck(): void {
    if(!this.countDaysForm.get('today')?.value === true) {
      this.secondDateCheck = this.formattedDate(this.dataHoje);
      this.countDaysForm.patchValue({secondDate: this.secondDateCheck});
      this.countDaysForm.get('secondDate')?.updateValueAndValidity();
    } else if(!this.countDaysForm.get('today')?.value === false) {
      this.countDaysForm.patchValue({secondDate: ''});
      this.countDaysForm.get('secondDate')?.updateValueAndValidity();
    }
  }

  //formulário
  public form(): void {
    this.countDaysForm = this.fb.group({
      firstDate: ['', [Validators.required]],
      secondDate: ['', [Validators.required]],
      today: [false]
    });
  }

  public save() {
    if(this.countDaysForm.get('firstDate')?.value >= this.countDaysForm.get('secondDate')?.value) {
      console.log('data errada');
    } else {
      console.log('ok');
      this.dataPassadoView = String(this.formattedDate(this.countDaysForm.get('firstDate')?.value));
      this.dataAtualFuturo = String(this.formattedDate(this.countDaysForm.get('secondDate')?.value));
      this.showCount();
    }

  }

  public formattedDate(data: Date) {
    return this.datePipe.transform(data, 'dd/MM/yyyy');
  }

  public showCount() {
    this.dataPassadoView = this.countDaysForm.get('firstDate')?.value;
    let diaPassado = this.dataPassadoView.slice(0, 2);
    let mesPassado = this.dataPassadoView.slice(2, 4);
    let anoPassado = this.dataPassadoView.slice(4);
    this.dataPassadoView = `${diaPassado}/${mesPassado}/${anoPassado}`;
    this.dataPassado = `${anoPassado}-${mesPassado}-${diaPassado}`

    this.dataAtualFuturo = this.countDaysForm.get('secondDate')?.value;
    let diaFuturo = this.dataAtualFuturo.slice(0, 2);
    let mesFuturo = this.dataAtualFuturo.slice(2, 4);
    let anoFuturo = this.dataAtualFuturo.slice(4);
    this.dataAtualFuturo = `${diaFuturo}/${mesFuturo}/${anoFuturo}`;

    //flag do dia de hoje ligada ou dia de hoje digitado
    if(this.countDaysForm.get('today')?.value === true || this.countDaysForm.get('secondDate')?.value === this.getToday()) {
      this.calculoDataPassadoParaHoje();
      console.log(this.getToday());
    }

    if (this.dataPassadoView != '' && this.dataAtualFuturo != '') {
      this.mostrarDatas = true;
    }
  }

  public getToday(): string {
    let dia = String(this.dataHoje.getDate());
    let mes = String(this.dataHoje.getMonth() + 1);
    let ano = this.dataHoje.getFullYear();

    if(this.dataHoje.getDate() <= 9) {
      dia = `0${dia}`;
    }

    if((this.dataHoje.getMonth() + 1) < 10) {
      mes = `0${mes}`;
    }
    return `${dia}${mes}${ano}`;
  }

  public calculoDataPassadoParaHoje() {
    this.dataPassado = new Date(this.dataPassado);

    if (this.dataHoje >= this.dataPassado) {
      this.diff = Math.abs(this.dataHoje.getTime() - this.dataPassado.getTime());
      this.dia = Math.ceil(this.diff / (1000 * 60 * 60 * 24) -1);
      this.mes = this.dia / this.CALC_MES;
      this.restoDivisaoDia = Math.floor(this.dia % this.CALC_MES);
      this.ano = this.dia / 365;
      this.restoDivisaoMes = this.mes % 12
      console.log("OK");

      if (this.dia > 30) {
        if (this.mes > 12) {
          this.mensagem = `Entre ${this.dataPassadoView} até hoje passaram: ${Math.trunc(this.ano)} ano(s) ${Math.trunc(this.restoDivisaoMes)} mes(es) e ${this.restoDivisaoDia} dia(s)!`;

        } else {
          this.mensagem = `Entre ${this.dataPassadoView} até hoje passaram: ${Math.trunc(this.restoDivisaoMes)} mes(es) e ${this.restoDivisaoDia} dia(s)!`;
        }
      } else {
        this.mensagem = `Entre ${this.dataPassadoView} até hoje passaram: ${this.restoDivisaoDia} dia(s)!`;
      }
    } else {
      this.mensagem = `Data Superior a data de Hoje`;
    }
  }
}
