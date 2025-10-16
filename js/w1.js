// w1.js
export async function fetchRandomPokemons(count = 4) {
  // 1) Получаем список всех покемонов (ограничиваемся разумной выборкой)
  const listResp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
  if (!listResp.ok) throw new Error('Не удалось загрузить список покемонов');
  const listData = await listResp.json();
  const results = listData.results || []; // [{ name, url }, ...]

  // 2) Выбираем случайные уникальные элементы
  const chosen = [];
  const pickedIndices = new Set();
  const maxCount = Math.min(count, results.length);
  while (chosen.length < maxCount) {
    const idx = Math.floor(Math.random() * results.length);
    if (pickedIndices.has(idx)) continue;
    pickedIndices.add(idx);
    chosen.push(results[idx]);
  }

  // 3) Загружаем детали каждого выбранного покемона, чтобы получить изображение
  const pokemons = await Promise.all(
    chosen.map(async (p) => {
      // p.url — адрес к details
      try {
        const detail = await fetch(p.url);
        if (!detail.ok) return { name: p.name, image: '' };
        const data = await detail.json();
        // В большинстве случаев изображение в data.sprites.front_default
        const image = data?.sprites?.front_default || '';
        return { name: p.name, image };
      } catch {
        return { name: p.name, image: '' };
      }
    })
  );

  // 4) Вернуть массив объектов { name, image }
  return pokemons;
}