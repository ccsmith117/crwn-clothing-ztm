import '../App.scss'

const Card = (props) => {
    const {title} = props
    return (
        <div className="category-container">
            <div className='background-image' />
            <div className="category-body-container">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default Card