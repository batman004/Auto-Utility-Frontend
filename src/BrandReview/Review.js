import axios from "axios";
import { useState, useEffect } from "react";
import host_url from "../config";
import { Spinner } from "react-bootstrap";

import { Table } from "react-bootstrap"

function Review({ brand }) {
    const [reviews, setReview] = useState('')

    useEffect(() => {
        const getReviews = async () => {
            const res = await axios.post(`${host_url}nlp/reviews/${brand}`)

            setReview(res?.data ?? '')
        }

        getReviews()
    }, [brand])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Vehicle Title</th>
                    <th>Review</th>
                    <th>Rating</th>
                    <th>Author Name</th>
                </tr>
            </thead>
            {
                reviews ?
                    <tbody>
                        <RenderReviews reviews={reviews} />
                    </tbody>
                    : <Spinner />
            }
        </Table>
    )
}


function RenderReviews({ reviews }) {
    /*
        Vehicle_Title    
        Review
        Rating
        Author_Name
    
    */
    const newReviews = []
    const length = Object.keys(reviews.Vehicle_Title).length;

    for (let i = 0; i < length; i++) {
        let key = i.toString()
        newReviews.push({
            title: reviews.Vehicle_Title[key],
            review: reviews.Review[key],
            rating: reviews.Rating[key],
            author: reviews.Author_Name[key]
        })
    }

    const buildReviews = () => {
        return newReviews.length > 0 ?
            newReviews.map((review, index) => {
                return (
                    <ReviewRow
                        key={index}
                        {...review}
                        index={index}
                    />
                )
            }) : ''
    }

    return (
        buildReviews()
    )
}


function ReviewRow(props) {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.title}</td>
            <td>{props.review}</td>
            <td>{props.rating}</td>
            <td>{props.author}</td>
        </tr>
    )
}


export default Review;