import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from './../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];


  constructor(private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private MatSnackBar: MatSnackBar,
    private dialog: MatDialog) {

  }


  public heroForm = new FormGroup({
    id: new FormControl<string>(""),
    superhero: new FormControl<string>("", { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(""),
    first_appearance: new FormControl<string>(""),
    characters: new FormControl<string>(""),
    alt_img: new FormControl<string>(""),
  })

  ngOnInit(): void {



    if (!this.router.url.includes('edit')) return


    this.activatedRoute.params.pipe(
      switchMap(({ id }: any) => {
        return this.heroService.getHeroById(id)
      })
    ).subscribe((hero) => {

      if (!hero) {
        return this.router.navigateByUrl("/")
      }
      return this.heroForm.reset(hero);
    })

  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero
  }



  public onSubmit(): void {
    // console.log({
    //   valid: this.heroForm.valid,
    //   data: this.heroForm.value
    // });

    if (this.heroForm.invalid) return

    this.currentHero.id ? this.updateHero() : this.createNewHero()

  }
  updateHero() {
    this.heroService.updateHero(this.currentHero).subscribe((hero: Hero) => {

      this.showMatSnackBar("Héroe actualizado")

      console.log(hero);
    })
  }
  createNewHero() {
    this.heroService.addHero(this.currentHero).subscribe((hero: Hero) => {
      console.log(hero);

      this.showMatSnackBar("Héroe creado!!")


    })
  }

  onDeleteHero(): void {
    ActivatedRoute
    if (!this.currentHero.id) {
      throw Error("Id is required")
    }


    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      console.log({ result });

      if (!result) {
        return
      }


      this.heroService.deleteHeroById(this.currentHero.id).subscribe((data) => {
        //console.log(data);

        if (data) {

          this.showMatSnackBar("Héroe eliminado exitosamente")

          this.router.navigateByUrl("/heroes")

        } else {

          this.showMatSnackBar("ups ha ocurrido un error,no se ha eliminado")

        }

      })

    });
  }



  showMatSnackBar(message: string): void {

    this.MatSnackBar.open(message, "", { duration: 2000 });

  }

}
