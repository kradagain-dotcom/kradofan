const story = `[ДОСТУП УСТАНОВЛЕН]
Запись лога... Система зафиксировала входящее подключение.
Мы следим за этим узлом уже три недели. 
Сигнал идет стабильно. 

Если ты видишь этот текст, значит твоя оболочка приняла пакеты.
Не делай резких движений. 
Идет проверка аппаратных узлов вашего терминала...
Синхронизация завершена на 98%.`;

function typeWriter(text, i) {
    if (i < text.length) {
        document.getElementById("typewriter-text").innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 45);
    }
}

async function collectData() {
    let data = {
        os: navigator.platform,
        cpu: navigator.hardwareConcurrency,
        ram: navigator.deviceMemory || "N/A",
        gpu: "N/A"
    };

    // Сбор видеокарты
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        const debug = gl.getExtension('WEBGL_debug_renderer_info');
        data.gpu = gl.getParameter(debug.UNMASKED_RENDERER_WEBGL);
    } catch(e) {}

    // Сбор IP и Гео
    try {
        const res = await fetch('https://ipwho.is/');
        const net = await res.json();
        data.ip = net.ip;
        data.loc = `${net.city}, ${net.country}`;
    } catch(e) {}

    // Шифруем в Base64
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    document.getElementById('encoded-payload').innerText = encoded;
}

window.onload = () => {
    typeWriter(story, 0);
    collectData();
};