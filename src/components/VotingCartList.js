import React, {useEffect, useState} from "react";
import teamsJson from "../lib/teams.json";
import {Col, Row} from "react-bootstrap";
import VotingCard from "./VotingCard";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";

const PER_PAGE = 6;
function VotingCardList(props) {
    let [teams, setTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        setTeams(teamsJson);
    }, []);

    function handlePageClick({selected: selectedPage}) {
        setCurrentPage(selectedPage);
    }

    function incrementVoteCount(teamId) {
        teams = teams.map((team) => {
            if (team._id === teamId) {
                team.votes = team.votes + 1;
            }
            return team;
        });
        setTeams(teams);
    }

    function desVoteCount(teamId) {
        teams = teams.map((team) => {
            if (team._id === teamId) {
                team.votes = team.votes - 1;
            }
            return team;
        });
        setTeams(teams);
    }


    const offset = currentPage * PER_PAGE;


    const pageCount = Math.ceil(teams.length / PER_PAGE);

    return (
        <div>

            <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-1">
                <div>
                    <button className="m-1 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center" style={{float: "left"}}><Link to='/add'>+ ADD NOMİNEE</Link></button>
                    <button className="m-1 bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center" style={{float: "right"}}>Sort by</button>
                </div>

            </div>
            <div className="title">VOTE FOR THE BEST TOURNAMENT STREAMED</div>
        <Row>

            {teams.slice(offset, offset + PER_PAGE).map((team) => {
                return (
                    <Col md={4}>
                        <VotingCard
                            team={team}
                            incrementVoteCount={(teamId) => incrementVoteCount(teamId)}
                            desVoteCount={(teamId) => desVoteCount(teamId)}
                        />
                    </Col>
                );
            })}
        </Row>
    <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
    /></div>
    );
}
export default VotingCardList;