import './Quote.css'

function QuoteContent({text, author, link}) {
    return (
        <figure id='quote-content'>
            <blockquote cite={link}>
                <p id='text'>
                    {text}
                </p>
            </blockquote>
            <figcaption id='author'>
                - {author}
            </figcaption>
        </figure>
    )
}

function QuotePanel({text, handleNewQuoteClick}) {
    return (
        <div id='quote-panel'>
            <a
                id='tweet-quote'
                href={'link'+text}
                target='_blank'
                rel='noreferrer'
            >
                Tweet it!
            </a>
            <button id='new-quote' onClick={handleNewQuoteClick}>New quote</button>
        </div>
    )
}

function Quote(props) {
    return (
        <div id='quote-box'>
            <QuoteContent
                text={props.text}
                author={props.author}
                link={props.link}
            />
            <QuotePanel 
                text={props.text}
                handleNewQuoteClick={props.handleNewQuoteClick}
            />
        </div>
    )
}

export default Quote