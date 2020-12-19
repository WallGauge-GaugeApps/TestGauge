const MyAppMan = require('./MyAppManager.js');

overrideLogging();

const loopRawSeconds = 15;
var loopRawInterval = null;
var sweepInterval = null;

var myAppMan = new MyAppMan(__dirname + '/gaugeConfig.json', __dirname + '/modifiedConfig.json', false);

var gaugeIrAddressLast = myAppMan.config.gaugeIrAddress

console.log('__________________ App Config follows __________________');
console.dir(myAppMan.config, { depth: null });
console.log('________________________________________________________');

if (myAppMan.config.gaugeValueToDisplayOnBoot == "sweep") {
    console.log('In 15 seconds will start endless sweep from 0 to 614');
    setTimeout(() => {
        sweep();
    }, 15000)
} else {
    console.log('In 15 seconds we will send data');
    setTimeout(() => {
        let x = myAppMan.config.gaugeValueToDisplayOnBoot;
        console.log('Setting gauge value to ' + x);
        myAppMan.setGaugeValue(x, ' raw stepper position at ' + (new Date()).toLocaleTimeString());
        loopRaw()
    }, 15000);

};

myAppMan.on('Update', () => {
    console.log('Update has fired. ');
    if (gaugeIrAddressLast != myAppMan.config.gaugeIrAddress) {
        console.log('The gauge IR address has changed we need to reinit myAppMan');
        gaugeIrAddressLast = myAppMan.config.gaugeIrAddress;
        myAppMan = new MyAppMan(__dirname + '/gaugeConfig.json', __dirname + '/modifiedConfig.json', false);
    }

    if (myAppMan.config.gaugeValueToDisplayOnBoot != "sweep") {
        clearInterval(sweepInterval);
        let x = myAppMan.config.gaugeValueToDisplayOnBoot;
        myAppMan.setGaugeStatus('Received new stepper value ' + x + ' for gauge address ' + myAppMan.config.gaugeIrAddress + ' at ' + (new Date()).toLocaleTimeString());
        console.log('Setting gauge value to ' + x);
        myAppMan.setGaugeValue(x, ' raw stepper position at ' + (new Date()).toLocaleTimeString());
        loopRaw();
    } else {
        clearInterval(loopRawInterval);
        sweep();
    };
});

myAppMan.on('gaugeCmd', (arg1) => {
    console.log('Gauge command received from gdtAdministrator app. ', arg1);
    switch (arg1) {
        case '0':
            console.log('Sending LED Off to gague at' + myAppMan.config.gaugeIrAddress);
            break;
        case 1:
            console.log('Sending LED On to gague at' + myAppMan.config.gaugeIrAddress);
            break;
        case '2':
            console.log('Sending LED Flash to gague at' + myAppMan.config.gaugeIrAddress);
            break;
        case '3':
            console.log('Sending Find Home to gague at' + myAppMan.config.gaugeIrAddress);
            break;
        case '4':
            console.log('Sending Reset gague at' + myAppMan.config.gaugeIrAddress);
            break;

        default:
            console.warn('Unknown gauge command ->' + arg1 + '<-');
            break;
    }
});

function loopRaw() {
    console.log('Starting send stepperValue interval for every ' + loopRawSeconds) + ' seconds.';
    clearInterval(loopRawInterval);
    loopRawInterval = setInterval(() => {
        let x = myAppMan.config.gaugeValueToDisplayOnBoot;
        console.log('Setting gauge value to ' + x);
        myAppMan.setGaugeValue(x, ' raw stepper position at ' + (new Date()).toLocaleTimeString());
    }, loopRawSeconds * 1000);
}

function sweep() {
    console.log('Starting gauge value sweep from 0 to 614');
    let max = 614;
    let min = 0;
    let count = 307;
    let interval = 10.23
    clearInterval(sweepInterval);
    sweepInterval = setInterval(() => {
        count = count + interval;
        if (count > max) {
            count = min;
        };
        myAppMan.setGaugeValue(count, ' raw')
    }, 60000);
};

/** Overrides console.error, console.warn, and console.debug
 * By placing <#> in front of the log text it will allow us to filter them with systemd
 * For example to just see errors and warnings use journalctl with the -p4 option 
 */
function overrideLogging() {
    const orignalConErr = console.error;
    const orignalConWarn = console.warn;
    const orignalConDebug = console.debug;
    console.error = ((data = '', arg = '') => { orignalConErr('<3>' + data, arg) });
    console.warn = ((data = '', arg = '') => { orignalConWarn('<4>' + data, arg) });
    console.debug = ((data = '', arg = '') => { orignalConDebug('<7>' + data, arg) });
};