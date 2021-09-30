import React, { Fragment, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

function AddCart () {
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [winner, setWinner] = useState('');
    const { addCart, teams } = useContext(GlobalContext);
    let history = useHistory();

    const onSubmit = e => {
        e.preventDefault();
        const newCart = {
            _id: teams && teams.length + 1,
            name,
            logo,
            winner:"",
            last_vote_date:"2021-09-30T19:02:38.285Z",
            votes:0
        }
        addCart(newCart);
        history.push("/");
    }

    return (
        <Fragment>
            <div className="w-full max-w-sm container mt-20 mx-auto">
                <form onSubmit={onSubmit}>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                            Tournament Game
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
                    </div>
                    <div className="w-full  mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="winner">
                            Tournament Winner Team
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={winner} onChange={(e) => setWinner(e.target.value)} type="text" placeholder="Enter winner" />
                    </div>
                    <div className="w-full  mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="url">
                            Cover Image Url
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={logo} onChange={(e) => setLogo(e.target.value)} type="text" placeholder="Enter url" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Add Nominee
                        </button>
                    </div>
                    <div className="text-center mt-4 text-gray-500"><Link to='/'>Cancel</Link></div>
                </form>
            </div>
        </Fragment>
    )
}
export default AddCart;