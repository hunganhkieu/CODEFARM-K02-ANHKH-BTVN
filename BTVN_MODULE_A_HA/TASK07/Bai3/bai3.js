const students = [
  { name: "An", scores: [8, 7.5, 9] },
  { name: "Bình", scores: [6, 5.5, 7] },
  { name: "Chi", scores: [9, 9.5, 10] },
];

const result = students.map((item) => {
  const scores = item.scores;
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  let average = sum / scores.length;
  average = Math.round(average * 10) / 10;
  return { name: item.name, average: average };
});

console.log(result);
