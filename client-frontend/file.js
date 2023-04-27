const fn = (text)=>
{
    let obj={};
    if(text =="A1")
    {
        obj.response = ["Consider these basic steps",
        "1. Check Internet is working in Neigbhouring Room",
        "2. Wifi or LAN is properly connected",
        "3. Check for Proxy setting in your system",
        "Try any of the following proxy",
        "172.31.100.1, 172.31.102.29, 172.31.100.27 with Port 3128"];
        obj.button = [];
        obj.button.push("Internet is also Not working in Nieghbour");
        obj.button.push("I am not able to set proxy");
        obj.button.push("LAN box is broken");
        obj.button.push("MNNIT wifi is not showing");
        obj.button.push("I have checked for all above options and still not working");
    }
    console.log(obj);
    return obj;
}
let obj = fn("A1");
console.log(obj);
