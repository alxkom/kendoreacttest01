import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
//import logo from './logo.svg';

import jquery from "jquery";
import Home from '../Home';
import Services from '../Services';
import Contacts from '../Contacts';

const LayoutDefault = (props) => (
    <Fragment>
        <div id="wrapper" className="d-flex">
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Start Bootstrap </div>
                <div className="list-group list-group-flush">
                    <a href="#" className="list-group-item list-group-item-action bg-light">Dashboard</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light">Shortcuts</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light">Overview</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light">Events</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light">Profile</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light">Status</a>
                </div>
            </div>
            <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <button className="btn btn-primary" id="menu-toggle" onClick={(e) => { e.preventDefault(); jquery('#wrapper').toggleClass('toggled'); }}>Toggle Menu</button>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Dropdown
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container-fluid">
                    <h1>Public Place</h1>
                    <Switch>
                        <Route exact path='/' component={Services} />
                        <Route exact path='/kendoreacttest01' component={Services} />
                        <Route exact path='/services' component={Services} />
                        <Route exact path='/contacts' component={Contacts} />
                        <Redirect from="/*" to="/" />
                    </Switch>
                </div>
            </div>
        </div>
    </Fragment>
);

export default LayoutDefault;