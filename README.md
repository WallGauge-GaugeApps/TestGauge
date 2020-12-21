# TestGauge

This gauge app sends raw stepper positions to a gauge for calibration and testing. Use the GDT Administrator iPhone app to set the Gauge Address and Raw Stepper value.
The Gauge address defaults to 255.  When you change the address the app will restart. Valid Gauge Addresses range from 1 to 255 (170 is a broadcast address). Valid Raw Stepper values range is 0 to 640 or "sweep". If set to "sweep" the gauge will sweep from 0 to 614 and back in increments of 10 every minute. Raw stepper values are sent to the irdTxServer every 15 seconds if not set to sweep. Remove this gauge app when calibration is complete as it will interfere with any gauge set to the same gauge address.

## Version 4.7.0 update

If the gauge is running the new firmware: WallGaugeAggressiveFirm2021v1 or WallGaugeConservativeFirm2021v1 you can now set LED status.  To send raw gauge commands, deselect the filter option in the GDT Administrator app by tapping on the little blue circle at the top right of the menu bar. This will expose the raw gauge command characteristic with the UUID of 3a6a8906-9fd9-429e-9957-aed5f260f333.  This characteristic will send a raw gague command to the gauge address in the "Gauge Address To Test" field.  Commands require a command number a comma and then command data (no spaces).  The numbers can be in a range from 0 to 15 and data 0 to 4095.  If a command does not have data (like zero needle command) you must still enter a zero as a placeholder after the comma.  For example to tell a gauge to find home (Zero Needle) enter the command `1,0`

Commands

```
  0,0   N/A
  1,0   Reset CPU in WallGauge
  2,0   Zero Needle
  3,0   Set Gauge Address (must do a Gauge Identify command first) The address is stored in eeprom
  4,xx  Set Wake time (defaults: Aggressive = 10 seconds, Conservative 30)
  5,xx  Set Sleep time (defaults: Aggressive  = 30 seconds, Conservative 300)
  6,xx  Start cycle sleep in (seconds from now, 0 = cancel)
  7,0   N/A
  8,xx  Goto Raw stepper position and then goto sleep
  9,xx  Goto Raw stepper position and stay awake
  10,x  LED CMD data value: 0=off, 1=on, 2=on when awake
  11,0  N/A
  12,0  N/A
  13,0  N/A
  14,0  N/A
  15,0 Tell Gauge to identify itself and stay awake for 60 minutes
```

To set gauge into quick response mode for calibration testing:

    1) Send command 10,2 and wait for the LED to start flashing.  This command will turn the LED on when the gauge is awake and off when sleeping.
    2) Send command 6,0 to disable cycle sleep.  You will be able to tell this has been received when the LED stops turning off. 
    3) Send command 2,0 to find home.  After the needle goes to the stop you can send raw gauge values to check the calibration of your gauge face.
    4) Once calibration testing is complete send command 1,0 to reset your gauge.  The gauge will turn on the LED and find home.  As soon as the needle starts to find home send a goto raw position to disable this command.  If you don't do this the gauge will continue to reset over and over.
