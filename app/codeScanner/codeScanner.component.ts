import { Component } from "@angular/core";
import { BarcodeScanner } from 'nativescript-barcodescanner';
const firebase = require("nativescript-plugin-firebase/app");

@Component({
    moduleId: module.id,
    selector: "code-scanner",
    templateUrl: "./codeScanner.component.html"
})
export class CodeScannerComponent {
    public assistant;
    public data: boolean = false;
    public isLoading: boolean = false;
    public checkinCorrect: boolean = false;
    public checkinError: boolean = false;

    constructor(private barcodeScanner: BarcodeScanner) { }

    public scanTapped(): void {
        this.barcodeScanner.scan({
            formats: 'QR_CODE, EAN_13',
            cancelLabel: 'VOLVER',
            cancelLabelBackgroundColor: '#333333',
            message: 'APUNTA AL CODIGO QR PARA EL CHECK IN',
            showFlipCameraButton: false,
            preferFrontCamera: false,
            showTorchButton: false,
            beepOnScan: true,
            torchOn: false,
            closeCallback: () => { },
            resultDisplayDuration: 0,
            openSettingsIfPermissionWasPreviouslyDenied: true
        }).then((result) => {
            const data = result.text.split(' | ');
            this.isLoading = true;
            this.verifyData(data[0], data[2]);
        }).catch(error => console.log(error));
    }

    private verifyData(event, ticketNumber) {
        const eventAssistantsCollection = firebase.firestore().collection('event-assistants');
        const query = eventAssistantsCollection
            .where("ticketNumber", "==", ticketNumber)
            .where("event", "==", event);

        query.get().then(querySnapshot => {
            if (querySnapshot.docSnapshots.length > 0) {
                const id = querySnapshot.docSnapshots[0].id;
                querySnapshot.forEach(doc => {
                    this.assistant = doc.data();
                    this.checkinCorrect = this.assistant.checkin ? false : true;
                    this.checkinError = false;
                });
                if (!this.assistant.checkin) {
                    const document = firebase.firestore().collection("event-assistants").doc(id);
                    document.update({
                        checkin: true,
                    }).then(() => {
                        this.checkinCorrect = true;
                        this.isLoading = false;
                    });
                }
            } else {
                this.checkinCorrect = true;
                this.checkinError = true;
            }
            this.data = true;
            this.isLoading = false;
        });
    }

    public clear() {
        this.data = false;
    }
}
