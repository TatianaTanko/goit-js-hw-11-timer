class CountdownTimer {
  constructor({ targetDate, selector }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.onTick = this.updateClockface;

    this.selector = selector;
    this.start();
  }

  start() {
    this.intervalId = setInterval(() => {
      const targetDate = this.targetDate.getTime();
      const currentTime = Date.now();
      const deltaTime = targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.padDay(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  padDay(value) {
    return String(value).padStart(3, '0');
  }

  updateClockface(time = { days, hours, mins, secs }) {
    const timerEl = document.querySelector(this.selector);
    for (const key in time) {
      const valueEl = timerEl.querySelector(`[data-value="${key}"]`);
      valueEl.innerHTML = `<span>${time[key]}</span>`;
    }
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2022'),
});

new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('May 20, 2022'),
});