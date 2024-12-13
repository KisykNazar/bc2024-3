const fs = require('fs');
const { program } = require('commander');

// Обробка командного рядка
program
  .requiredOption('-i, --input <path>', 'Path to the input file')
  .option('-o, --output <path>', 'Path to the output file')
  .option('-d, --display', 'Display result in console');

program.parse(process.argv);

const options = program.opts();

// Перевірка, чи вказано обов'язковий параметр
if (!options.input) {
  console.log("Please, specify input file");
  process.exit(1);
}

// Перевірка наявності файлу для зчитування
if (!fs.existsSync(options.input)) {
  console.log("Cannot find input file");
  process.exit(1);
}

// Читання даних з файлу
const data = JSON.parse(fs.readFileSync(options.input));

// Перевірка на наявність курсу валют
if (!Array.isArray(data)) {
  console.log("Invalid data format");
  process.exit(1);
}

// Знаходимо максимальний курс
let maxRate = Math.max(...data.filter(rate => rate.rate).map(rate => rate.rate));

// Формуємо результат
const result = `Максимальний курс: ${maxRate}`;

// Якщо необхідно вивести результат в консоль
if (options.display) {
  console.log(result);
}

// Якщо вказано шлях для збереження результату
if (options.output) {
  fs.writeFileSync(options.output, result);
}
