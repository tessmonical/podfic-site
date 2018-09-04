import { connect } from "react-redux";
import {fetchAllPodfics} from '../../store/podfics'
import Home from './Home'

const mapStateToProps = (state) => ({
    podfics: state.podfics
})

const mapDispatchToProps = (dispatch) => ({
    fetchAllPodfics: () => dispatch(fetchAllPodfics())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)


/*
podfics:  [{
        "tagIds": [
            "1234567890abc"
        ],
        "imageUrl": "https://via.placeholder.com/300x300",
        "createdDate": "2018-08-28 11:30",
        "files": [
            {
                "description": "with music",
                "seconds": 3600,
                "id": "12345678901234567890",
                "hasMusic": true,
                "type": "mp3",
                "url": "https://raw.githubusercontent.com/anars/blank-audio/master/5-minutes-of-silence.mp3"
            },
            {
                "description": "without music",
                "seconds": 3500,
                "id": "123434567456789",
                "hasMusic": false,
                "type": "mp3",
                "url": "https://raw.githubusercontent.com/anars/blank-audio/master/5-minutes-of-silence.mp3"
            }
        ],
        "id": "test-item-garbage-id1",
        "updatedDate": "2018-08-29 11:39",
        "title": "The Best Podfic Ever"
    },
    {
        "tagIds": [
            "1234567890abc"
        ],
        "imageUrl": "https://via.placeholder.com/300x300",
        "createdDate": "2018-08-28 11:30",
        "files": [
            {
                "description": "with music",
                "seconds": 3600,
                "id": "12345678901234567890",
                "hasMusic": true,
                "type": "mp3",
                "url": "https://raw.githubusercontent.com/anars/blank-audio/master/5-minutes-of-silence.mp3"
            },
            {
                "description": "without music",
                "seconds": 3500,
                "id": "123434567456789",
                "hasMusic": false,
                "type": "mp3",
                "url": "https://raw.githubusercontent.com/anars/blank-audio/master/5-minutes-of-silence.mp3"
            }
        ],
        "id": "test-item-garbage-id2",
        "updatedDate": "2018-08-29 11:39",
        "title": "This is not a real podfic"
    }
]

*/