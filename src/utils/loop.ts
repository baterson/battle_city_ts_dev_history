const createLoop = (update, render) => {
    let accumulatedTime = 0;
    let lastTime = 0;
    let deltaTime = 1 / 60

    const loop = (time) => {
        accumulatedTime += (time - lastTime) / 1000;
        while (accumulatedTime > deltaTime) {
            update(deltaTime);
            accumulatedTime -= deltaTime;
        }
        lastTime = time;
        render()
        requestAnimationFrame(loop)
    }
    loop(0)
}

export default createLoop
