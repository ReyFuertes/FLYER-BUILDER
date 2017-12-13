"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var dialog_component_1 = require("./../../shared/dialog/dialog.component");
var material_1 = require("@angular/material");
var core_1 = require("@angular/core");
var DialogService = (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.open = function (title, caption) {
        var dialogRef;
        dialogRef = this.dialog.open(dialog_component_1.Dialog, {
            height: '400px',
            width: '600px',
            disableClose: true,
        });
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.caption = caption;
        return dialogRef.afterClosed();
    };
    DialogService.prototype.confirm = function (title, message) {
        var dialogRef;
        dialogRef = this.dialog.open(dialog_component_1.Dialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
    };
    return DialogService;
}());
DialogService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [material_1.MdDialog])
], DialogService);
exports.DialogService = DialogService;
//# sourceMappingURL=dialog.service.js.map