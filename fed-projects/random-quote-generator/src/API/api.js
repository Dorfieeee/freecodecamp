import quotes from './quotes'

function getRandomQuote() {
    return new Promise((res, rej) => {
        let randomPosition = Math.floor(Math.random() * quotes.length)
        let responseDelay = 500
        setTimeout(() => {
            res(quotes[randomPosition])
        }, responseDelay)
    })
}

export {getRandomQuote}