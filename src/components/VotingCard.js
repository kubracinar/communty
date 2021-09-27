import React from "react";
import { Card, Button } from "react-bootstrap";

function VotingCard(props) {
    let { team, incrementVoteCount,desVoteCount } = props;

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
            </Card.Body>
            <Card.Footer>{team.votes} POINTS</Card.Footer>
        </Card>
    );
}
export default VotingCard;