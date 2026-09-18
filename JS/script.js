let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;

const images = [];
for(let i = imgStart; i < imgStart + 7; i++){
    images.push(`https://picsum.photos/seed/${i}/${dimension}/${dimension}`);
}
let cards =[...images, ...images];

console.table(cards);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
















