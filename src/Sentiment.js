import axios from 'axios';
import { useState, useEffect } from "react"
import { ProgressBar } from "react-bootstrap"
import host_url from "./config";

function Sentiment({ brand }) {
    const [sentiment, setSentiment] = useState(0);

    useEffect(() => {
        const getSentiment = async () => {
            const res = await axios.post(
                `${host_url}nlp/sentiment?brand=${brand}`)
            
            let sentimentVal = res?.data.average_brand_sentiment ?? '0'
            sentimentVal = parseInt(sentimentVal)
            setSentiment(sentimentVal)
        }

        getSentiment()
    }, [brand])


    return (
        <>
            <h2>Sentiment: {sentiment}</h2>
            <ProgressBar>
            {
                sentiment >= 5
                &&
                <ProgressBar striped variant="success" now={sentiment * 5} key={1} />
            }
            {
                sentiment >= 3
                &&
                <ProgressBar variant="warning" now={sentiment * 3} key={2} />
            }
            {
                sentiment < 3
                &&
                <ProgressBar striped variant="danger" now={10} key={3} />
            }
        </ProgressBar>
        </>
    )
}


export default Sentiment;