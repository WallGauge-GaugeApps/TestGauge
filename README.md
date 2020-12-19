# TestGauge

This gauge app sends raw stepper positions to a gauge for calibration and testing.

Use the GDT Administrator iPhone app to set the Gauge Address and Raw Stepper value.

The Gauge address defaults to 255.  When you change the address the app will restart.

Valid Gauge Addresses range from 1 to 255 (170 is a broadcast address)

Valid Raw Stepper values range is 0 to 614 or "sweep". If set to "sweep" the gauge will sweep from 0 to 614 and back in increments of 10 every minute.

Raw stepper values are sent to the irdTxServer every 15 seconds if not set to sweep.

Remove this gauge app when calibration is complete as it will interfere with any gauge set to the same gauge address.

## Version 4.7.0 update

If the gauge is running new firmware WallGaugeAggressiveFirm2021v1 or WallGaugeConservativeFirm2021v1 you can set LED status.  To send new commands deselect the filter option in the GDT Administrator app by tapping on the little blue circle at the top right of the menu bar.  You can see a list of commands as the data for the characteristic with the UUID of 3a6a8906-9fd9-429e-9957-aed5f260f333.

To set gauge into quick response mode:

    1) Send command 2 and wait for the LED to start flashing.  This command will turn the LED on when the gauge is awake and off when sleeping.
    2) Send command 5 to disable cycle sleep.  You will be able to tell this has been received when the LED stops turning off. 
    3) Send command 3 to find home.  After the needle goes to the stop you can send raw gauge values to check the calibration of your gauge face.
    4) Once calibration testing is complete send command 4 to reset your gauge.  The gauge will turn on the LED and find home.  As soon as the needle starts to find home send a goto raw position to disable this command.  If you don't do this the gauge will continue to reset over and over.
