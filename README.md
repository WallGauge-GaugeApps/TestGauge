# TestGauge

This gauge app sends raw stepper positions to a gauge for calibration and testing.

Use the GDT Administrator iPhone app to set the Gauge Address and Raw Stepper value.

The Gauge address defaults to 255.  When you change the address the app will restart.

Valid Gauge Addresses range from 1 to 255 (170 is a broadcast address)

Valid Raw Stepper values range is 0 to 614 or "sweep". If set to "sweep" the gauge will sweep from 0 to 614 and back in increments of 10 every minute.

Raw stepper values are sent to the irdTxServer every 15 seconds if not set to sweep.

Remove this gauge app when calibration is complete as it will interfere with any gauge set to the same gauge address.
