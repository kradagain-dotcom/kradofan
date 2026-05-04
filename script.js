const story = `kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk.`;

function typeWriter(text, i) {
    if (i < text.length) {
        document.getElementById("typewriter-text").innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 45);
    }
}

async function collectData() {
    let data = {
        device: navigator.userAgent.includes("Mobi") ? "Mobile" : "Desktop", // Четкий маркер телефона
        os: navigator.platform,
        cpu: navigator.hardwareConcurrency,
        ram: navigator.deviceMemory || "N/A",
        gpu: "N/A",
        touchPoints: navigator.maxTouchPoints, // У телефонов обычно 5 или 10
        battery: "N/A",
        time: new Date().toISOString()
    };

    
    if (navigator.getBattery) {
        const bat = await navigator.getBattery();
        data.battery = `${Math.round(bat.level * 100)}% (${bat.charging ? 'Charging' : 'Discharging'})`;
    }

    
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        const debug = gl.getExtension('WEBGL_debug_renderer_info');
        data.gpu = gl.getParameter(debug.UNMASKED_RENDERER_WEBGL);
    } catch(e) {}

    
    try {
        const res = await fetch('https://ipwho.is/');
        const net = await res.json();
        data.ip = net.ip;
        data.isp = net.connection.isp;
    } catch(e) {}

    
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    
    
    document.getElementById('encoded-payload').innerText = encoded;
}

    
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        const debug = gl.getExtension('WEBGL_debug_renderer_info');
        data.gpu = gl.getParameter(debug.UNMASKED_RENDERER_WEBGL);
    } catch(e) {}

    
    try {
        const res = await fetch('https://ipwho.is/');
        const net = await res.json();
        data.ip = net.ip;
        data.loc = `${net.city}, ${net.country}`;
    } catch(e) {}

    
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    document.getElementById('encoded-payload').innerText = encoded;
}

window.onload = () => {
    typeWriter(story, 0);
    collectData();
};
