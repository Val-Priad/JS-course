"use strict";

const form: HTMLInputElement = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType: HTMLInputElement = document.querySelector(
  ".form__input--type"
);
const inputDistance: HTMLInputElement = document.querySelector(
  ".form__input--distance"
);
const inputDuration: HTMLInputElement = document.querySelector(
  ".form__input--duration"
);
const inputCadence: HTMLInputElement = document.querySelector(
  ".form__input--cadence"
);
const inputElevation: HTMLInputElement = document.querySelector(
  ".form__input--elevation"
);

inputType.value = "running";

class Workout {
  type?: string;
  coords;
  distance;
  duration;
  description;
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    // prettier-ignore
    const months = [
      "January", "February", "March",
      "April",   "May",      "June",
      "July",    "August",   "September",
      "October", "November", "December",
    ];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(
      1
    )} on ${months.at(this.date.getMonth())} ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  cadence;
  pace;
  type = "running";

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.#calcPace();
    this._setDescription();
  }

  #calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  elevationGain;
  speed;
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.#calcSpeed();
    this._setDescription();
  }

  #calcSpeed() {
    this.speed = this.distance / this.duration / 60;
    return this.speed;
  }
}

class App {
  #map;
  #mapZoomLevel = 18;
  #mapEvent;
  #workouts = [];

  constructor() {
    this.#getPosition();
    form.addEventListener("submit", this.#submitWorkout.bind(this));
    inputType.addEventListener(
      "change",
      this.#toggleElevationField.bind(this)
    );
    containerWorkouts.addEventListener("click", this.#moveToPopup.bind(this));
  }

  #getLocalStorage() {
    const workouts = JSON.parse(localStorage.getItem("workouts"));
    if (!workouts) return;
    this.#workouts = workouts;
    this.#workouts.forEach((w) => {
      this.#renderWorkoutPopup(w);
      this.#renderWorkout(w);
    });
  }

  #moveToPopup(e) {
    const workoutEl = e.target.closest(".workout");
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (workout) => workout.id === workoutEl.dataset.id
    );
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  #submitWorkout(e) {
    e.preventDefault();

    this.#addNewWorkout();

    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        "";
    this.#closeWorkoutForm();
  }

  #getPosition() {
    navigator.geolocation.getCurrentPosition(this.#loadMap.bind(this), () =>
      alert(`Could not get your position`)
    );
  }

  #loadMap(position) {
    const { latitude, longitude } = position.coords;

    this.#map = L.map("map").setView(
      [latitude, longitude],
      this.#mapZoomLevel
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#getLocalStorage();

    this.#map.on("click", (e) => {
      this.#mapEvent = e;
      this.#openWorkoutForm();
    });
  }

  #openWorkoutForm() {
    form.classList.remove("hidden");
  }

  #closeWorkoutForm() {
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 2000);
  }

  #toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  #inputIsValid(...elements) {
    if (elements.some((el) => Number.isNaN(el))) {
      alert(`Invalid signs used`);
      return false;
    } else if (elements.some((el) => el <= 0)) {
      alert(`You can't use negative numbers as input`);
      return false;
    }
    return true;
  }

  #renderWorkoutPopup(workout: Cycling | Running) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴"} ${workout.description}`
      )
      .openPopup();
  }

  #renderWorkout(workout: any) {
    let html = `
<li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">️${
              workout.type === "running" ? "🏃‍♂️" : "🚴"
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;

    if (workout.type === "running") {
      html += `</div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;
    } else if (workout.type === "cycling")
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed()}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
 
    `;
    form.insertAdjacentHTML("afterend", html);
  }

  #setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }

  #addNewWorkout() {
    let workout;
    const type = inputType.value;
    const duration = +inputDuration.value;
    const distance = +inputDistance.value;
    const cadence = +inputCadence.value;
    const elevation = +inputElevation.value;
    const { lat, lng } = this.#mapEvent.latlng;
    switch (type) {
      case "running":
        if (!this.#inputIsValid(distance, duration, cadence)) return;
        workout = new Running([lat, lng], distance, duration, cadence);
        break;
      case "cycling":
        if (!this.#inputIsValid(distance, duration, elevation)) return;
        workout = new Cycling([lat, lng], distance, duration, elevation);
        break;
    }

    this.#workouts.push(workout);

    this.#renderWorkoutPopup(workout);
    this.#renderWorkout(workout);
    this.#setLocalStorage();
  }

  reset() {
    localStorage.removeItem("workouts");
    location.reload();
  }
}

const app = new App();
