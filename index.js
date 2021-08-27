// // Для подсчета значений используй следующие готовые формулы, где time - разница между targetDate и текущей датой.

// /*
//  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
//  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
//  */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

// /*
//  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//  * остатка % и делим его на количество миллисекунд в одном часе
//  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//  */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// /*
//  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
//  */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

// /*
//  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//  * миллисекунд в одной секунде (1000)
//  */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.idInterval = null;
    this.startTimer = this.start.bind(this);
  }

  start() {
    console.log(this);
    this.idInterval = setInterval(() => {
      this.updateTimer(this.getRefs());
    }, 1000);
  }

  getRefs() {
    const container = document.querySelector(this.selector);
    const btnRef = container.querySelector(".btn");
    const daysRef = container.querySelector('[data-value="days"]');
    const hoursRef = container.querySelector('[data-value="hours"]');
    const minsRef = container.querySelector('[data-value="mins"]');
    const secsRef = container.querySelector('[data-value="secs"]');

    return { container, btnRef, daysRef, hoursRef, minsRef, secsRef };
  }

  updateTimer({ container, btnRef, daysRef, hoursRef, minsRef, secsRef }) {
    btnRef.addEventListener("click", this.startTimer);

    const time = this.targetDate - Date.now();
    if (time < 0) {
      clearInterval(this.idInterval);
      container.innerHTML = "<h1>Time is over</h1>";
      return;
    }
    daysRef.textContent = Math.floor(time / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, "0");
    hoursRef.textContent = Math.floor(
      (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
      .toString()
      .padStart(2, "0");
    minsRef.textContent = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    secsRef.textContent = Math.floor((time % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Aug 29, 2021"),
});

timer.updateTimer(timer.getRefs);
