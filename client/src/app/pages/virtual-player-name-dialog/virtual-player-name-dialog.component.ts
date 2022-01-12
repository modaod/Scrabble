import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { VirtualPlayerNameService } from '@app/services/virtual-player-name.service';
import { ConfirmationDialogComponent } from '@app/components/confirmation-dialog/confirmation-dialog.component';

@Component({
    selector: 'app-virtual-player-name-dialog',
    templateUrl: './virtual-player-name-dialog.component.html',
    styleUrls: ['./virtual-player-name-dialog.component.scss'],
})
export class VirtualPlayerNameDialogComponent implements OnInit {
    @Input() nameControl: FormControl;
    @Input() categoryControl: FormControl;
    nameValid = true;
    selected = 'beginner';

    constructor(
        private router: Router,
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dialog: MatDialog,
        public virtualPlayerNameService: VirtualPlayerNameService,
    ) {}

    ngOnInit(): void {
        this.nameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
        this.categoryControl = new FormControl('');
    }

    onReturn() {
        this.router.navigate(['admin/virtual-player-name']);
    }

    onChange() {
        this.virtualPlayerNameService.validation(this.nameControl.value).subscribe((data) => {
            this.nameValid = data;
        });
    }

    onSubmit() {
        if (this.virtualPlayerNameService.modificationDialog) {
            //
            this.virtualPlayerNameService.modify(this.nameControl.value).then(
                () => {
                    this.router.navigateByUrl('/admin/dictionary-list');
                },
                () => {
                    //
                },
            );
            this.virtualPlayerNameService.modificationDialog = false;
        } else {
            this.virtualPlayerNameService.create(this.nameControl.value, this.categoryControl.value).then(
                () => {
                    this.router.navigateByUrl('/admin/dictionary-list');
                },
                () => {
                    //
                },
            );
        }
    }
}
