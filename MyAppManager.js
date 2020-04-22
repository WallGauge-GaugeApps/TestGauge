const AppMan = require('app-manager');

class myAppManager extends AppMan{
    bleMyConfig(){
        console.log('Setting up sbPowerGauge specfic characteristics and config.'); 
        var gaugeIrAddress = this.bPrl.Characteristic('c10a9fa2-25e0-4f09-b598-e0a66d2a93af', 'gaugeIrAddress', ["encrypt-read","encrypt-write"]);
        var gaugeValueToDisplayOnBoot = this.bPrl.Characteristic('3f46661d-5906-4c51-affc-d957343f6ba7', 'gaugeValueToDisplayOnBoot', ["encrypt-read","encrypt-write"]);

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

        gaugeIrAddress.setValue(this.config.gaugeIrAddress);
        gaugeValueToDisplayOnBoot.setValue(this.config.gaugeValueToDisplayOnBoot);
    };
};

module.exports = myAppManager;