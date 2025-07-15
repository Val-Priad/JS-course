"use strict";

const btnWhereAmI = document.querySelector(".btn--country");
const btnAddCountry = document.querySelector(".btn--add-country");
const btnAddImg = document.querySelector(".btn--add-image");
const countriesContainer: HTMLElement = document.querySelector(".countries");
const imagesContainer: HTMLElement = document.querySelector(".images");
// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal
// OR
// https://countries-api-836d.onrender.com/countries/

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const getFirstValue = (obj): any => {
  return Object.values(obj)[0];
};

const renderCountry = (data: any) => {
  const html = `        
  <article class="country">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${getFirstValue(data.name)}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1_000_000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${getFirstValue(
              data.languages
            )}</p>
            <p class="country__row"><span>💰</span>${
              getFirstValue(data.currencies).name
            }</p>
          </div>
  </article>
 
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = "1";
};

const getJSON = (url) => {
  return fetch(url).then((response: Response) => {
    if (!response.ok)
      throw new Error(`Something went wrong: ${response.status}`);
    return response.json();
  });
};

const getCountryData = async function (countryName) {
  return getJSON(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((data) => {
      if (!data) throw new Error(`There is no data`);
      renderCountry(data[0]);
      /* it doesn't return from function it returns only from `then` block
      if we don't `return` the result of this getJSON */
      return data[0];
    })
    .catch((err) => {
      console.error(`${err} 💥💥💥`);
    });
};

/* // WhereAmI first version
const whereAmI = () => {
  getPosition()
    .then((position: any) => {
      let { latitude, longitude } = position.coords;
      if (!latitude || !longitude)
        throw new Error("There is no latitude or longitude");
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
      );
    })
    .then((response: Response) => {
      if (!response.ok) throw new Error(`Failed fetching reverse geolocation`);
      return response.json();
    })
    .then((data) => {
      if (!data) throw new Error(`Failed get JSON`);
      getCountryData(data.countryName);
    })
    .catch((err) => {
      console.error(`${err} 💥💥💥`);
    });
};
*/

const whereAmI = async () => {
  try {
    const position: any = await getPosition();
    let { latitude: lat, longitude: lng } = position.coords;
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!response.ok) throw new Error("Problem getting country");
    const data = await response.json();
    getCountryData(data.countryName);
  } catch (e) {
    console.error(`${e} 💥💥💥`);

    /* If there is no catch block error will cause reject function under the 
    hood. 
    When we use try catch block async always will return fulfilled state,
    so under the hood resolve function will be called.
    So if you want to catch rejected state on async function with try catch
    block, you always need to rethrow the error that occurred.
    */
  }
};

btnAddCountry.addEventListener("click", () => {
  let countryName = prompt("Enter country name: ");
  getCountryData(countryName);
});

/* getPosition simplified for understanding version
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      (err) => reject(err)
    );
  });
};
*/

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

btnWhereAmI.addEventListener("click", whereAmI);

const createImage = (path) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.classList.add("images");
    img.src = path; // img starts to load when I assign path to this img
    img.addEventListener("load", () => {
      imagesContainer.append(img);
      resolve(img);
    });
    img.onerror = (e) => {
      reject(new Error(`${e}`));
    };
  });
};

/* First version of loadAll
const loadAll = async (imgArr) => {
  const imgs = [];
  for (const imgPath of imgArr) {
    imgs.push(await createImage(imgPath));
  }

  for (const img of imgs) {
    img.classList.add("parallel");
  }
  console.log(imgs);
};
*/

const loadAll = async (imgArr) => {
  try {
    let imgs = imgArr.map(async (path) => await createImage(path));
    // it happens because async function always returns a promise
    const imgEl = await Promise.all(imgs);
    console.log(imgEl);
    imgEl.map((img) => img.classList.add("parallel"));
  } catch {}
};

btnAddImg.addEventListener("click", () => {
  loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
});

/*
btnAddImg.addEventListener("click", () => {
  (async () => {
    try {
      let img: any = await createImage("img/img-1.jpg");
      await wait(2);
      img.style.display = "none";
      img = await createImage("img/img-2.jpg");
      await wait(2);
      img.style.display = "none";
      img = await createImage("img/error-img.jpg");
      await wait(2);
      img.style.display = "none";
    } catch (e) {
      console.error(`${e} 💥💥💥`);
    }
  })();
});
*/

/*
const createImage = (path) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.classList.add("images");
    img.src = path; // img starts to load when I assign path to this img
    img.addEventListener("load", () => {
      imagesContainer.append(img);
      resolve(img);
    });
    img.onerror = (e) => {
      reject(new Error(`${e}`));
    };
  });
};
*/

/*
btnAddImg.addEventListener("click", () => {
  let imgGlobal: HTMLElement;
  createImage("img/img-1.jpg")
    .then((img: HTMLElement) => {
      imgGlobal = img;
      return wait(2);
    })
    .then(() => {
      imgGlobal.style.display = "none";
    })
    .then(() => {
      return createImage("img/img-2.jpg");
    })
    .then((img: HTMLElement) => {
      imgGlobal = img;
      return wait(2);
    })
    .then(() => {
      imgGlobal.style.display = "none";
    })
    .then(() => {
      return createImage("img/error-img.jpg");
    })
    .then((img: HTMLElement) => {
      imgGlobal = img;
      return wait(2);
    })
    .then(() => {
      imgGlobal.style.display = "none";
    })
    .catch((e) => {
      console.error(`${e} 💥💥💥`);
    });
});
*/

/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw is happening");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("You Win 💰");
    } else {
      reject(new Error("You lost your money 💩"));
    }
  });
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.log(err));



wait(2)
  .then(() => {
    console.log("Waited for 2 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("Waited for 2 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("Waited for 2 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("Waited for 2 seconds");
    return wait(1);
  });
*/

/* // Immediately executed function 
console.log("1: Start");
(async () => {
  console.log("2: Fetching position");
  await whereAmI();
  console.log("3: End");
})();
*/

/* Promise.all
const get3Countries = async (c1, c2, c3) => {
  try {
    // It doesn't make any sense we execute each function one by one...
    // await getCountryData(c1);
    // await getCountryData(c2);
    // await getCountryData(c3);
    
    const data = await Promise.all([
      getCountryData(c1),
      getCountryData(c2),
      getCountryData(c3),
    ]);
    data.forEach((d) => {
      console.log(d.population);
    });
  } catch (e) {
    console.error(e.message + "💥💥💥");
  }
};

get3Countries("USA", "Russia", "Iran");

*/

/* Promise.race
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error("Request took too long!"));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/Belarus`),
  timeout(0.1),
]);
*/
