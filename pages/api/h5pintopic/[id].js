import { h5ptopic } from '../../../data/h5ptopic'

export default function handler({ query: { id } }, res) {
    const filtered = h5ptopic.filter((topic) => topic.id === parseInt(id))
    
    if (filtered.length > 0) {
        res.status(200).json(filtered)
    } else {
        res 
            .status(404)
            .json({ message: `H5P with the id of ${id} is not found` })
    }
}