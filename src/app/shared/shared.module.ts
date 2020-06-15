import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, FlexLayoutModule, FormsModule],
  exports: [FlexLayoutModule, FormsModule],
})
export class SharedModule {}
