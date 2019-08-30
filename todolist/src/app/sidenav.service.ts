import { Injectable } from '@angular/core';
import { MatSidenav, MatDrawer } from '@angular/material';

@Injectable()
export class SidenavService {
  private sidenav: MatDrawer;

  public setSidenav(sidenav: MatDrawer) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle() {
    return this.sidenav.toggle();
  }
}
