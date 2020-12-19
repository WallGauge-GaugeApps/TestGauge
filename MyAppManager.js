const AppMan = require('app-manager');

class myAppManager extends AppMan{
    bleMyConfig(){
        console.log('Setting up sbPowerGauge specfic characteristics and config.'); 
        var gaugeIrAddress = this.bPrl.Characteristic('c10a9fa2-25e0-4f09-b598-e0a66d2a93af', 'gaugeIrAddress', ["encrypt-read","encrypt-write"]);
        var gaugeValueToDisplayOnBoot = this.bPrl.Characteristic('3f46661d-5906-4c51-affc-d957343f6ba7', 'gaugeValueToDisplayOnBoot', ["encrypt-read","encrypt-write"]);
        var gaugeCmd = this.bPrl.Characteristic('3a6a8906-9fd9-429e-9957-aed5f260f333', 'gaugeCmd', ["encrypt-read","encrypt-write"]);


        gaugeIrAddress.on('WriteValue', (device, arg1)=>{
            console.log(device + ', has set new gauge IR Address of ' + arg1);
            gaugeIrAddress.setValue(arg1);
            var x = arg1.toString('utf8');
            this.saveItem({gaugeIrAddress:x}); 
        });
        
        gaugeIrAddress.on('ReadValue', (device)=>{
            console.log(device + ' has connected and is reading gauge IR Address');
            gaugeIrAddress.setValue(this.config.gaugeIrAddress);
            return (this.config.gaugeIrAddress);
        });

        gaugeValueToDisplayOnBoot.on('WriteValue', (device, arg1)=>{
            console.log(device + ', has set new gauge value to display on boot to ' + arg1);
            gaugeValueToDisplayOnBoot.setValue(arg1);
            var x = arg1.toString('utf8');
            this.saveItem({gaugeValueToDisplayOnBoot:x});  
        });

        gaugeValueToDisplayOnBoot.on('ReadValue', (device)=>{
            console.log(device + ' has connected and is reading gauge value to display on boot.');
            gaugeValueToDisplayOnBoot.setValue(this.config.gaugeValueToDisplayOnBoot);
            return (this.config.gaugeValueToDisplayOnBoot);
        });

        gaugeCmd.on('WriteValue', (device, arg1)=>{
            console.log(device + ', has set a new gauge command ' + arg1);
            this.emit('gaugeCmd', arg1);
        });
        
        gaugeCmd.on('ReadValue', (device)=>{
            console.log(device + ' has connected and is reading gauge commands');
            return (this.config.gaugeCmd);
        });
        
        const cmdMenue = '0 = LED off, 1 = LED on, 2 = LED flash, 3 = find home, 4 = reset'

        gaugeIrAddress.setValue(this.config.gaugeIrAddress);
        gaugeValueToDisplayOnBoot.setValue(this.config.gaugeValueToDisplayOnBoot);
        gaugeCmd.setValue(cmdMenue);
    };

    encodeCmd(cmdNum = 0, value = 0, address = this._deviceAddress) {
        console.log('encoding command: cmdNum = ' + cmdNum + ', value = ' + value + ', address = ', address);
        let encodedCmd = this.gTx.encodeCmd(cmdNum, value, address);
        console.log('The encoded command = ' + encodedCmd);

        
        // this.gTx.sendEncodedCmd(this.gTx.encodeCmd(this.gTx._cmdList.Check_Battery_Voltage));
    }
};

module.exports = myAppManager;