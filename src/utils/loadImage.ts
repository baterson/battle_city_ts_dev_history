const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const image: any = new Image()
        image.addEventListener('load', () => resolve(image))
        image.src = src
    })
}

export default loadImage