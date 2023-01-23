// script to get system information and return it 

const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;
const drive = osu.drive;
const netstat = osu.netstat;

cpuInfo = async () => {
    var coreCount = cpu.count();
    var cpuPercentage = await cpu.usage();
    let loadAvg = ''
    cpu.loadavg().forEach((i) => (loadAvg += `${i}%`));
    return {core: coreCount, percentage: cpuPercentage, load: loadAvg.trim()};

}
async function systemInfo(){
    let cpu_info = await cpuInfo();
    let mem_info = await mem.info();
    let drive_info = await drive.info();
    let netstat_info = await netstat.inOut();
    return {cpu_data : cpu_info, mem_data : {used: mem_info.usedMemMb, total: mem_info.totalMemMb, percentage: mem_info.usedMemPercentage}, 
    drive_data : {used: drive_info.usedGb, total: drive_info.totalGb, percentage: drive_info.usedPercentage}, netstat_data : netstat_info}

}

module.exports.systemInfo = systemInfo;