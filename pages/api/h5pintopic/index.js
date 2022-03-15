import { h5ptopic } from '../../../data/h5ptopic'

export default function handler(req, res) {
    res.status(200).json(h5ptopic)
}