import React from "react";
import {Container} from "react-bootstrap";
import "./assets/styles.scss";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import {Route, Switch} from 'react-router-dom';
import VotingCardList from "./components/VotingCartList";
import AddCart from "./components/AddCart";
import {GlobalProvider} from "./context/GlobalState";



function App() {


    return (
        <Container className="app">
            <header>
                <h1>COMMUNITY GAMING</h1>
            </header>
            <GlobalProvider>
            <Switch>
                <Route path="/" component={VotingCardList} exact />
                <Route path="/add" component={AddCart} exact />

            </Switch>
            </GlobalProvider>
        </Container>
    );
}

export default App;