const MyAppMan =        require('./MyAppManager.js');

overrideLogging();
var sweepInterval = {};
const myAppMan = new MyAppMan(__dirname + '/gaugeConfig.json', __dirname + '/modifiedConfig.json', false);

console.log('__________________ App Config follows __________________');
console.dir(myAppMan.config, {depth: null});
console.log('________________________________________________________');

if(myAppMan.config.gaugeValueToDisplayOnBoot == "sweep"){
    console.log('In 15 seconds will start endless sweep from 0 to 614');
    setTimeout(()=>{
        sweep();
    },15000)
} else {
    console.log('In 15 seconds we will send data');
    setTimeout(()=>{
        let x = myAppMan.config.gaugeValueToDisplayOnBoot;
        console.log('Setting gauge value to ' + x);
        myAppMan.setGaugeValue(x, ' raw');
    }, 15000);

};

myAppMan.on('Update', ()=>{
    console.log('Update has fired. ');
    if(myAppMan.config.gaugeValueToDisplayOnBoot != "sweep"){
        let x = myAppMan.config.gaugeValueToDisplayOnBoot;
        console.log('Setting gauge value to ' + x);
        myAppMan.setGaugeValue(x, ' raw');
    } else {
        sweep();
    };
});

function sweep(){
    console.log('Starting gauge value sweep from 0 to 614');
    let max = 614;
    let min = 0;
    let count = min;
    let interval = 10
    clearInterval(sweepInterval);
    sweepInterval = setInterval(() => {
        count = count + interval;
        if(count > max){
            count = min;
        };
        myAppMan.setGaugeValue(count, ' raw')
    }, 15000);
}

/** Overrides console.error, console.warn, and console.debug
 * By placing <#> in front of the log text it will allow us to filter them with systemd
 * For example to just see errors and warnings use journalctl with the -p4 option 
 */
function overrideLogging(){
    const orignalConErr = console.error;
    const orignalConWarn = console.warn;
    const orignalConDebug = console.debug;
    console.error = ((data = '', arg = '')=>{orignalConErr('<3>'+data, arg)});
    console.warn = ((data = '', arg = '')=>{orignalConWarn('<4>'+data, arg)});
    console.debug = ((data = '', arg = '')=>{orignalConDebug('<7>'+data, arg)});
  };