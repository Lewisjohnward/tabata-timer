const convertTime = (time : number) => {
    let minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    const formatStr = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`

    return formatStr
}

export default convertTime
