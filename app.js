const MyAppMan =        require('./MyAppManager.js');

overrideLogging();

const myAppMan = new MyAppMan(__dirname + '/gaugeConfig.json', __dirname + '/modifiedConfig.json', false);

console.log('__________________ App Config follows __________________');
console.dir(myAppMan.config, {depth: null});
console.log('________________________________________________________');

if(myAppMan.config.gaugeValueToDisplayOnBoot == "sweep"){
    console.log('Add Logic to sweep the value between 0 and 614')
} else {
    let x = myAppMan.config.gaugeValueToDisplayOnBoot;
    console.log('Setting gauge value to ' + x);
    myAppMan.setGaugeValue(x, ' raw');
};


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