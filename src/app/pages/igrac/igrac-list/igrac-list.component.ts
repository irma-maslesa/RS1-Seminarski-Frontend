import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KlubApi } from '../../klub/shared/klub-api.constant';
import { LoV } from '../../shared/LoV.model';
import { RestApiService } from '../../shared/rest-api.service';
import { IgracApi } from '../shared/igrac-api.constant';
import { Igrac } from '../shared/igrac.model';

@Component({
  selector: 'igrac-list',
  templateUrl: './igrac-list.component.html',
  styleUrls: ['./igrac-list.component.scss']
})
export class IgracListComponent implements OnInit {

  @Input() igraci: Igrac[];
  klubovi: LoV[];
  searchValue: string;
  searchValueKlub: string;

  searchObject: { ImePrezime: string, KlubId: number } = { ImePrezime: null, KlubId: 0 };
  statistika = false;
  dir = "desc";

  constructor(private api: RestApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data != null && data.statistika != null && data.statistika) {
        this.statistika = true;
      }
    });

    if (this.igraci == null) {
      this.api.get(IgracApi.GET_IGRAC).subscribe(
        (response: Igrac[]) => {
          this.igraci = response;
        }
      )
    }

    this.api.get(KlubApi.GET_LOV).subscribe((response) => {
      if (response) {
        this.klubovi = response;
      }
    })
  }

  search(value = null) {
    if (value != null && value == 0) {
      let params = new HttpParams();
      params = this.searchObject.ImePrezime != null && this.searchObject.ImePrezime.length > 2 ? params.set("ImePrezime", this.searchObject.ImePrezime) : params;
      this.api.get(IgracApi.GET_IGRAC, { params: params }).subscribe(
        (response: Igrac[]) => {
          this.igraci = response;
        }
      )
    }
    else if ((this.searchObject.ImePrezime != null &&
      (this.searchObject.ImePrezime.length == 0 || this.searchObject.ImePrezime.length > 2)) ||
      (this.searchObject.KlubId != null && this.searchObject.KlubId != 0)) {
      let params = new HttpParams();
      params = this.searchObject.ImePrezime != null && this.searchObject.ImePrezime.length > 2 ? params.set("ImePrezime", this.searchObject.ImePrezime) : params;
      params = this.searchObject.KlubId != 0 ? params.set("KlubId", this.searchObject.KlubId.toString()) : params;

      this.api.get(IgracApi.GET_IGRAC, { params: params }).subscribe(
        (response: Igrac[]) => {
          this.igraci = response;
        }
      )
    }
  }

  sortTable(n) {
    if (!this.statistika && n == 0)
      n = 1;
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("list");
    switching = true;
    dir = this.getDir();
    const collator = new Intl.Collator('bs');

    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (collator.compare(x.innerHTML.toLowerCase(), y.innerHTML.toLowerCase()) > 0) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (collator.compare(x.innerHTML.toLowerCase(), y.innerHTML.toLowerCase()) < 0) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0) {
          switching = true;
        }
      }
    }
  }
  getDir() {
    this.dir = this.dir == "asc" ? "desc" : "asc";

    return this.dir;
  }

  handleClickIgrac(id) {
    this.router.navigateByUrl(`igrac/${id}`);
  }
}
