document.addEventListener('DOMContentLoaded', function() {
    const popupContainer = document.getElementById('popup-container');
    // Cria 3 popups iniciais
    for (let i = 0; i < 3; i++) {
      popupContainer.appendChild(createPopup());
    }
  });
  
  let popupTimer = null;
  
  function startPopupTimer() {
    cancelPopupTimer();
    popupTimer = setTimeout(() => {
      if (document.querySelectorAll('.popup').length === 0) {
        const popupContainer = document.getElementById('popup-container');
        popupContainer.appendChild(createPopup());
      }
      popupTimer = null;
    }, 15000); // 15 segundos
  }
  
  function cancelPopupTimer() {
    if (popupTimer !== null) {
      clearTimeout(popupTimer);
      popupTimer = null;
    }
  }
  
  function createPopup() {
    cancelPopupTimer();
    
    const popup = document.createElement('div');
    popup.className = 'popup';
    
    // Define posição aleatória para o popup dentro da janela
    const popupWidth = 250;
    const popupHeight = 150; // altura aproximada
    const maxLeft = window.innerWidth - popupWidth;
    const maxTop = window.innerHeight - popupHeight;
    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
    
    // Cria a mensagem do popup
    const message = document.createElement('p');
    message.textContent = 'Você gostou do site?';
    popup.appendChild(message);
    
    // Botão "Sim" remove apenas este popup
    const yesBtn = document.createElement('button');
    yesBtn.className = 'yes-btn';
    yesBtn.textContent = 'Sim';
    yesBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      popup.remove();
      if (document.querySelectorAll('.popup').length === 0) {
        startPopupTimer();
      }
    });
    popup.appendChild(yesBtn);
    
    // Botão "Não" duplica os popups atuais
    const noBtn = document.createElement('button');
    noBtn.className = 'no-btn';
    noBtn.textContent = 'Não';
    noBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      duplicatePopups();
    });
    popup.appendChild(noBtn);
    
    return popup;
  }
  
  function duplicatePopups() {
    const popupContainer = document.getElementById('popup-container');
    const currentPopups = Array.from(document.querySelectorAll('.popup'));
    currentPopups.forEach(function() {
      popupContainer.appendChild(createPopup());
    });
    cancelPopupTimer();
  }
  