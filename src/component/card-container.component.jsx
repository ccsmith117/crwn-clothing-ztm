import '../App.scss'
import Card from './card.component'

const categories = [
    {
        id: 1,
        title: 'Hats'
    },
    {
        id: 2,
        title: 'Jackets'
    },
    {
        id: 3,
        title: 'Sneakers'
    },
    {
        id: 4,
        title: 'Womens'
    },
    {
        id: 5,
        title: 'Mens'
    }
]

const CardContainer = () => {
    return (
        <div className="categories-container">
            { categories.map(({id, title}) => <Card key={id} title={title} />) }
        </div>
    )
}

export default CardContainer