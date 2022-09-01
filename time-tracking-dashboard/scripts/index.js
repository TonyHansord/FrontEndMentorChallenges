`use strict`;

const cardTimes = document.querySelectorAll(`.card-time`);
const prevTimes = document.querySelectorAll(`.prev-time`);
const listItems = document.querySelectorAll(`.list-item`);
const prevFormat = document.querySelectorAll(`.previous-format`);

let userData;
const displayHour = (dataNum) => (dataNum === 1 ? "hr" : "hrs");

let defaultTimeFrame = "daily";

const setPrevFormat = (timeframe) =>
  timeframe === "daily"
    ? "Yesterday -"
    : timeframe === "weekly"
    ? "Last Week -"
    : "Last Month -";

prevFormat.forEach((element) => {
  element.textContent = setPrevFormat(defaultTimeFrame);
});

fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    userData = data;
  })
  .catch((error) => console.log(error));

function setActive(timeframe) {
  listItems.forEach((element) => {
    element.classList.remove(`active`);
  });
  timeframe.classList.add("active");
}

function updateFigures(timeframe) {
  for (let i = 0; i < userData.length; i++) {
    let current = userData[i].timeframes[timeframe].current;
    let previous = userData[i].timeframes[timeframe].previous;
    prevFormat[i].textContent = setPrevFormat(timeframe);
    cardTimes[i].textContent = `${current} ${displayHour(current)}`;
    prevTimes[i].textContent = `${previous} ${displayHour(previous)}`;
  }
}

listItems.forEach((element) => {
  element.addEventListener(`click`, (event) => {
    let id = event.target.id;
    setActive(document.getElementById(id));
    updateFigures(id);
  });
});
