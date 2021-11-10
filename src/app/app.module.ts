import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { es_ES } from "ng-zorro-antd/i18n";
import { CommonModule, registerLocaleData } from "@angular/common";
import es from "@angular/common/locales/es";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzSpaceModule } from "ng-zorro-antd/space";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzListModule } from "ng-zorro-antd/list";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzMessageModule } from "ng-zorro-antd/message";
import { SafePipe } from "src/pipe/safePipe";
import { FormgroupComponent } from "./formgroup/formgroup.component";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzSliderModule } from "ng-zorro-antd/slider";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";

registerLocaleData(es);

@NgModule({
	declarations: [AppComponent, SafePipe, FormgroupComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		NzDividerModule,
		NzGridModule,
		NzLayoutModule,
		NzSpaceModule,
		NzUploadModule,
		NzListModule,
		NzSelectModule,
		NzCardModule,
		NzSwitchModule,
		NzSkeletonModule,
		NzAvatarModule,
		NzModalModule,
		NzButtonModule,
		NzTableModule,
		NzPaginationModule,
		NzFormModule,
		NzInputModule,
		NzIconModule,
		NzRadioModule,
		NzMessageModule,
		NzCheckboxModule,
		NzSliderModule,
		NzInputNumberModule,
	],
	providers: [{ provide: NZ_I18N, useValue: es_ES }],
	bootstrap: [AppComponent],
})
export class AppModule {}
