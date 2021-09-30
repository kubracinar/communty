import React, {useContext} from "react";
import { Card, Button } from "react-bootstrap";
import {GlobalContext} from "../context/GlobalState";
import actionTypes from "../utils/actionTypes";


function VotingCard(props) {
    let { team, incrementVoteCount,desVoteCount } = props;
    let {orderBy,
        setOrderBy, dispatch
    } = useContext(GlobalContext);

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={`/assets/images/${team.logo}`} />
            <Card.Body>
                <Card.Title>{team.name}</Card.Title>
                <div style={{fontSize:"12px"}}><div>Winner : {team.winner}</div>
                <div>Last Vote Date : {team.last_vote_date}</div></div>
                <Button variant="success" className="bg-green-400 hover:bg-green-500 text-white font-bold rounded focus:outline-none focus:shadow-outline" onClick={() => dispatch({ type: actionTypes.UP_VOTE, id: team._id, orderBy })}>
                    UP
                </Button>
                <Button variant="success" className="bg-green-400 hover:bg-green-500 text-white font-bold rounded focus:outline-none focus:shadow-outline" onClick={() => dispatch({ type: actionTypes.DOWN_VOTE, id: team._id, orderBy })}>
                    DOWN
                </Button>

            </Card.Body>
            <Card.Footer>{team.votes} POINTS</Card.Footer>

        </Card>
    );
}
export default VotingCard;