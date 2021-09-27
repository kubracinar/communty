import React, {useContext} from "react";
import { Card, Button } from "react-bootstrap";
import {GlobalContext} from "../context/GlobalState";

function VotingCard(props) {
    let { team, incrementVoteCount,desVoteCount } = props;
    const { teams, removeCart } = useContext(GlobalContext);
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={`/assets/images/${team.logo}`} />
            <Card.Body>
                <Card.Title>{team.name}</Card.Title>
                <div>Winner : {team.winner}</div>
                <Button variant="success" className="bg-green-400 hover:bg-green-500 text-white font-bold rounded focus:outline-none focus:shadow-outline" onClick={() => incrementVoteCount(team._id)}>
                    UP
                </Button>
                <Button variant="success" className="bg-green-400 hover:bg-green-500 text-white font-bold rounded focus:outline-none focus:shadow-outline" onClick={() => desVoteCount(team._id)}>
                    DOWN
                </Button>
                <button onClick={() => removeCart(team._id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
            </Card.Body>
            <Card.Footer>{team.votes} POINTS</Card.Footer>
        </Card>
    );
}
export default VotingCard;