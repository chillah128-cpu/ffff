import { fetchRandomPokemons} from './w1.js';
import { startTimer, resetTimer } from './w2.js';
import { getZodiacSign } from './w3.js';
import { rollDice } from './w4.js';

document.addEventListener('DOMContentLoaded', () => {
   const pokemonsBtn = document.getElementById('pokemons-btn');  
  const pokemonsArea = document.getElementById('pokemons-area');  

  pokemonsBtn.addEventListener('click', async () => {  
    try {  
      const items = await fetchRandomPokemons(4);  
      // Рендерим внутри виджета: фото + имя  
      pokemonsArea.innerHTML = `  
        <div class="pokemons-area">  
          ${items.map(p => `  
            <div class="pokemon-card">  
              ${p.image ? `<img src="${p.image}" alt="${p.name}" class="pokemon-image" />` : ''}  
              <div class="pokemon-name">${p.name}</div>  
            </div>  
          `).join('')}  
        </div>  
      `;  
     } catch (e) {  
      pokemonsArea.innerHTML = `<div class="pokemon-error">Ошибка загрузки покемонов</div>`;  
      console.error(e);  
    }  
  });  

  // 2) Таймер
  const timerDisplay = document.getElementById('timer-display');
  const startBtn = document.getElementById('start-timer');
  const resetBtn = document.getElementById('reset-timer');
  startBtn.addEventListener('click', () => {
    startTimer((t) => { timerDisplay.textContent = t; });
  });
  resetBtn.addEventListener('click', () => {
    resetTimer((t) => { timerDisplay.textContent = t; });
  });

  // 3) Знак зодиака
  const showZodiacBtn = document.getElementById('show-zodiac');
  const zodiacDisplay = document.getElementById('zodiac-display');
  // Пример: используем текущую дату
  showZodiacBtn.addEventListener('click', () => {
    const now = new Date();
    const sign = getZodiacSign(now.getMonth() + 1, now.getDate());
    zodiacDisplay.innerHTML = `Ваш знак: <strong>${sign}</strong>`;
  });

  // 4) Кубик
  const rollDiceBtn = document.getElementById('roll-dice');
  const diceDisplay = document.getElementById('dice-display');
  rollDiceBtn.addEventListener('click', () => {
    const value = rollDice(6);
    diceDisplay.textContent = String(value);
  });
});