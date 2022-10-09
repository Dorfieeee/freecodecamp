import './IconLink.css'

function IconLink(props) {
    return (
        <a
            id={props.id}
            href={props.href}
            target='_blank'
            rel='noreferrer'
        >
            {props.icon}
        </a>
    )
}

export default IconLink