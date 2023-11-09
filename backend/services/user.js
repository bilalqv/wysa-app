

// this is a very rough and random calculation of sleep score
function calculateSleepScore(user) {
    const {
        sleepBedTime,
        sleepWakeUpTime,
        sleepHours,
        sleepChanges,
        sleepStruggleDuration,
    } = user;

    let score = 0;

    const [bedHour, bedMinute] = sleepBedTime.split(":").map(Number);
    const [wakeUpHour, wakeUpMinute] = sleepWakeUpTime.split(":").map(Number);
    const sleepDuration =
        (wakeUpHour - bedHour) * 60 + (wakeUpMinute - bedMinute);

    if (sleepHours >= 7) {
        score += 40;
    } else if (sleepHours >= 6) {
        score += 30;
    } else {
        score += 20;
    }

    for (let i = 0; i < sleepChanges.length; i++) {
        if (sleepChanges[i] === "fallAsleep") {
            score += 20;
        } else if (sleepChanges[i] === "sleepThroughNight") {
            score += 20;
        } else if (sleepChanges[i] === "wakeUpRefreshed") {
            score += 20;
        }
    }

    if (sleepStruggleDuration === "Less than 2 weeks") {
        score -= 5;
    } else if (sleepStruggleDuration === "2 to 8 weeks") {
        score -= 10;
    } else if (sleepStruggleDuration === "More than 8 weeks") {
        score -= 20;
    }

    return score;
}

module.exports = {
    calculateSleepScore,
}