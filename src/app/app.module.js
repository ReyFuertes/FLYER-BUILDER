"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var flyer_service_1 = require("./service/flyer/flyer.service");
var dialog_module_1 = require("./shared/dialog/dialog.module");
var header_component_1 = require("./components/pages/header/header.component");
var sidenav_component_1 = require("./components/pages/sidenav/sidenav.component");
var home_component_1 = require("./components/pages/home/home.component");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
require("hammerjs");
var rootRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: '**', redirectTo: '' }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            material_1.MaterialModule,
            material_1.MdButtonModule,
            material_1.MdTabsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            dialog_module_1.DialogsModule,
            router_1.RouterModule.forRoot(rootRoutes),
        ],
        declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, sidenav_component_1.SidenavComponent, header_component_1.HeaderComponent],
        providers: [flyer_service_1.FlyerService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map