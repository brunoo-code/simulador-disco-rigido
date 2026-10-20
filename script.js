// elementos da pagina
const diskCapacitySelect = document.getElementById('diskCapacity');
const videoSlider = document.getElementById('videoSlider');
const videoCountDisplay = document.getElementById('videoCountDisplay');
const btnAddVideo = document.getElementById('btnAddVideo');
const btnAddBatch = document.getElementById('btnAddBatch');
const btnReset = document.getElementById('btnReset');

const progressBar = document.getElementById('progressBar');
const usagePercentage = document.getElementById('usagePercentage');
const totalSpaceText = document.getElementById('totalSpaceText');
const usedSpaceText = document.getElementById('usedSpaceText');
const freeSpaceText = document.getElementById('freeSpaceText');
const alertBox = document.getElementById('alertBox');

function calcularEspacoOcupado(X) {
    return (200 * X) + 500;
}

function formatarTamanho(mb) {
    if (mb >= 1024) {
        return (mb / 1024).toFixed(2) + ' GB (' + mb.toLocaleString() + ' MB)';
    }
    return mb.toLocaleString() + ' MB';
}

function atualizarSimulador() {
    const capacidadeTotalMB = parseFloat(diskCapacitySelect.value);
    const quantidadeVideos = parseInt(videoSlider.value);

    let espacoOcupadoMB = calcularEspacoOcupado(quantidadeVideos);

    if (espacoOcupadoMB > capacidadeTotalMB) {
        espacoOcupadoMB = capacidadeTotalMB;
        alertBox.classList.remove('hidden');
    } else {
        alertBox.classList.add('hidden');
    }

    const espacoLivreMB = capacidadeTotalMB - espacoOcupadoMB;
    const percentual = ((espacoOcupadoMB / capacidadeTotalMB) * 100).toFixed(1);

    videoSlider.value = quantidadeVideos;
    videoCountDisplay.textContent = `X = ${quantidadeVideos} vídeos`;
    progressBar.style.width = percentual + '%';
    usagePercentage.textContent = percentual + '%';

    totalSpaceText.textContent = formatarTamanho(capacidadeTotalMB);
    usedSpaceText.textContent = formatarTamanho(espacoOcupadoMB);
    freeSpaceText.textContent = formatarTamanho(espacoLivreMB);
}

videoSlider.addEventListener('input', atualizarSimulador);
diskCapacitySelect.addEventListener('change', atualizarSimulador);

btnAddVideo.addEventListener('click', () => {
    let atual = parseInt(videoSlider.value);
    if (atual < parseInt(videoSlider.max)) {
        videoSlider.value = atual + 1;
        atualizarSimulador();
    }
});

btnAddBatch.addEventListener('click', () => {
    let atual = parseInt(videoSlider.value);
    let novo = atual + 50;
    if (novo > parseInt(videoSlider.max)) novo = parseInt(videoSlider.max);
    videoSlider.value = novo;
    atualizarSimulador();
});

btnReset.addEventListener('click', () => {
    videoSlider.value = 0;
    atualizarSimulador();
});

window.onload = atualizarSimulador;
