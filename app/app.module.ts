import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    imports: [
        NativeScriptModule,
        NativeScriptCommonModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
