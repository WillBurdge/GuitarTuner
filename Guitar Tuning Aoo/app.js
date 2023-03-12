const strings = document.querySelectorAll('.string');
const micBtn = document.getElementById('mic-btn');
let audioContext, analyzer, dataArray, bufferLength, frequencyData;

strings.forEach(string => {
  const indicator = string.querySelector('.indicator');
  const note = string.querySelector('.note');

  string.addEventListener('click', () => {
    playSound(note.dataset.note);
  });

  function playSound(note) {
    const audio = new Audio(`audio/${note}.mp3`);
    audio.play();
    animateIndicator(indicator);
  }

  function animateIndicator(indicator) {
    indicator.style.transform = 'rotate(90deg)';
    setTimeout(() => {
      indicator.style.transform = 'rotate(0deg)';
    }, 100);
  }
});

micBtn.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      audioContext = new AudioContext();
      analyzer = audioContext.createAnalyser();

      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyzer);

      analyzer.fftSize = 2048;
      bufferLength = analyzer.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      frequencyData = new Float32Array(bufferLength);

      requestAnimationFrame(animate);
    })
    .catch(error => {
      console.log(error);
    });
});

