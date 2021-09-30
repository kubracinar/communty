import React, {useContext, useEffect, useState} from "react";
import {Col, Row, Toast} from "react-bootstrap";
import VotingCard from "./VotingCard";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import {Modal} from "react-responsive-modal";
import {GlobalContext} from "../context/GlobalState";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import actionTypes from "../utils/actionTypes";
import $ from 'jquery';

const PER_PAGE = 6;

function VotingCardList(props) {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [item, setItem] = useState({});
    const [removedItem, setRemovedItem] = useState({});
    let {
        teams, removeCart, orderBy,
        setOrderBy, dispatch
    } = useContext(GlobalContext);

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

    }

    function desVoteCount(teamId) {
        teams = teams.map((team) => {
            if (team._id === teamId) {
                team.votes = team.votes - 1;
            }
            return team;
        });

    }

    const handleChange = event => {
        const value = event.target.value;
        let type;

        switch (value) {
            case "asc":
                type = actionTypes.ORDER_BY_ASC;
                break;
            case "desc":
                type = actionTypes.ORDER_BY_DESC;
                break;
            default:
                type = actionTypes.ORDER_BY_DEFAULT;
        }

        dispatch({type});
        setOrderBy(value);
        setCurrentPage(1);
    };
    const Toast = () => {
        if (removedItem.name === "") {
            return null;
        }

        return (
            <div className="toast" role="alert">
                <div className="toast-body">
                    <strong>{removedItem.name}</strong> removed.
                </div>
            </div>
        );
    };
    const closeIcon =
        (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 36 36"
                fillOpacity=".5"
                fillRule="evenodd"
                clipRule="evenodd"
            >
                <path
                    d="M12 11.293L22.293 1l.707.707L12.707 12 23 22.293l-.707.707L12 12.707 1.707 23 1 22.293 11.293 12 1 1.707 1.707 1 12 11.293z"></path>
            </svg>
        );
    const onRemove = item => {
        setItem(item);
        $("#removeModal").modal("show");
    };
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(teams.length / PER_PAGE);
    const removeItem = () => {
        dispatch({ type: actionTypes.REMOVE_CART, id: item.id });
        setRemovedItem(item);
        $(".toast").toast({
            delay: 1000
        }).toast("show");
    };
    return (
        <div>

            <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-1">
                <div>
                    <button
                        className="m-1 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
                        style={{float: "left"}}><Link to='/add'>+ ADD NOMİNEE</Link></button>
                    <div className="linkList-content m-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded inline-flex"  style={{float: "right"}} data-testid="linkList-content">
                        <div className="form-group select-wrapper">Order by
                            <select className="form-control" data-testid="select" onChange={handleChange}
                                    value={orderBy}>
                                <option value=" ">Order by</option>
                                <option value="desc">Most Voted (Z -> A)</option>
                                <option value="asc">Less Voted (A -> Z)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="title">VOTE FOR THE BEST TOURNAMENT STREAMED</div>
            <Row>

                {teams.slice(offset, offset + PER_PAGE).map((team) => {
                    return (

                        <Col md={4}>
                            <Toast/>
                            <Modal/>
                            <VotingCard
                                team={team}
                                incrementVoteCount={(teamId) => incrementVoteCount(teamId)}
                                desVoteCount={(teamId) => desVoteCount(teamId)}
                            />
                            <button onClick={() => removeCart(team._id)}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round" className="feather feather-trash-2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                            <ToastContainer closeOnClick={false} closeButton={false}/>
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
            />


            <Modal open={open} onClose={onCloseModal} closeIcon={closeIcon}
                   center
                   classNames={{
                       modal: 'modal-dialog deleteModal'
                   }}>
                <div>
                    <h6 className="title">Remove Nominee</h6>
                    {teams.map((team) => {
                        return (
                            <div className="modal fade" id="removeModal">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Remove Nominee</h5>
                                            <button type="button" className="close" data-dismiss="modal">
                                                <span>&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="modal-text1">Do you want to remove:</div>
                                            <div className="modal-text2">{team.name}</div>
                                            <div className="modal-buttons">
                                                <button type="button" className="btn btn-dark rounded-pill" onClick={removeItem}
                                                        data-dismiss="modal">OK</button>
                                                <button type="button" className="btn btn-dark rounded-pill"
                                                        data-dismiss="modal">CANCEL</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })};
                </div>
            </Modal>

        </div>
    );
}

export default VotingCardList;