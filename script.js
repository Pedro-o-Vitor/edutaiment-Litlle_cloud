// Suas chaves de configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCruNebHh6-PjF8y764PLDLNgCH5tiL2Y4",
  authDomain: "edutainment-rygupeta.firebaseapp.com",
  projectId: "edutainment-rygupeta",
  storageBucket: "edutainment-rygupeta.firebasestorage.app",
  messagingSenderId: "603051441784",
  appId: "1:603051441784:web:bcad81b25e93f3c185b78d"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// 🔄 Lógica de Navegação e Autenticação
const screens = document.querySelectorAll(".screen");
const authFeedback = document.getElementById("auth-feedback");

function showScreen(screenId) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// 🔐 Autenticação com Firebase
auth.onAuthStateChanged(user => {
  if (user) {
    showScreen("home");
  } else {
    showScreen("login");
  }
});

async function loginEmail() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
    authFeedback.textContent = "";
  } catch (error) {
    authFeedback.textContent = "Erro: " + error.message;
  }
}

async function registerEmail() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    authFeedback.textContent = "Cadastro realizado com sucesso!";
  } catch (error) {
    authFeedback.textContent = "Erro: " + error.message;
  }
}

async function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    authFeedback.textContent = "";
  } catch (error) {
    authFeedback.textContent = "Erro: " + error.message;
  }
}

function logout() {
  auth.signOut();
}

// 🔊 Funções de Áudio
const audioPlayer = document.getElementById('audio-player');
function playInstructionAudio(src) {
  audioPlayer.src = src;
  audioPlayer.play();
}
function playSuccessAudio(src = 'caminho/do/audio-sucesso.mp3') {
  audioPlayer.src = src;
  audioPlayer.play();
}

function goTo(screen, playAudio = true) {
  showScreen(screen);
  if (playAudio) {
    switch (screen) {
      case 'dragdrop':
        playInstructionAudio('caminho/do/audio-dragdrop.mp3');
        break;
      case 'colors':
        playInstructionAudio('caminho/do/audio-colors.mp3');
        break;
      case 'locks':
        playInstructionAudio('caminho/do/audio-locks.mp3');
        break;
    }
  }
}

// 🎵 Jogo 1: Arrastar Arquivos
let dragged = 0;
const files = document.querySelectorAll('#dragdrop #files img');
files.forEach(file => {
  file.addEventListener("dragstart", e => {
    e.dataTransfer.setData("file", file.id);
  });
});
const cloudTarget = document.getElementById("cloud-target");
cloudTarget.addEventListener("dragover", e => e.preventDefault());
cloudTarget.addEventListener("drop", e => {
  const fileId = e.dataTransfer.getData("file");
  const fileElement = document.getElementById(fileId);
  if (fileElement) {
    fileElement.style.display = 'none';
    dragged++;
    if (dragged === 3) {
      document.getElementById("dragdrop-feedback").style.display = "block";
      playSuccessAudio();
    }
  }
});

// 🎨 Jogo 2: Conectar Cores
let connections = { blue: false, red: false, green: false };
function rotateCable(cable) {
  const rotation = (parseInt(cable.dataset.rotation) + 90);
  const colorId = cable.dataset.colorId;
  cable.style.transform = `rotate(${rotation}deg)`;
  cable.dataset.rotation = rotation;

  if (rotation % 180 === 0) {
    connections[colorId] = true;
    cable.classList.add('connected');
  } else {
    connections[colorId] = false;
    cable.classList.remove('connected');
  }
  checkColorsGame();
}

function checkColorsGame() {
  if (connections.blue && connections.red && connections.green) {
    document.getElementById("colors-feedback").style.display = "block";
    playSuccessAudio();
  }
}

// 🔒 Jogo 3: Cadeados
let locked = 0;
const lockItems = document.querySelectorAll("#locks .lock-item img");
lockItems.forEach(lock => {
  lock.addEventListener("dragstart", e => {
    const parent = lock.closest('.lock-item');
    e.dataTransfer.setData("size", parent.dataset.size);
  });
});
const cloudItems = document.querySelectorAll("#locks .cloud-item");
cloudItems.forEach(cloud => {
  cloud.addEventListener("dragover", e => e.preventDefault());
  cloud.addEventListener("drop", e => {
    const size = e.dataTransfer.getData("size");
    if (size === cloud.dataset.size) {
      locked++;
      cloud.querySelector('img').src = `img/cloud_locked_${size}.png`;
      if (locked === 3) {
        document.getElementById("locks-feedback").style.display = "block";
        playSuccessAudio();
      }
    }
  });
});
  // Supondo que o botão tenha o id "playButton"
// Evento de clique no botão Play
document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.querySelector(".play-btn");

  if (Botaoplay) {
    Botaoplay.addEventListener("click", () => {
      // Redireciona para a página home.html
      window.location.href = "home.html";
    });
  }
});
