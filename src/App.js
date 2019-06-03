import React, { Component } from 'react';
//import logo from './logo.svg';
import '@progress/kendo-theme-material/dist/all.css';

import { Grid, GridColumn } from '@progress/kendo-react-grid';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                { ProductName: "Chai", Price: 10 },
                { ProductName: "Chang", Price: 20 }
            ]
        }
    }
    render() {
        return (
            <div className="App">
                <Grid data={this.state.data}>
                    <GridColumn field="ProductName" title="Product name" />
                    <GridColumn field="Price" />
                </Grid>
            </div>
        );
    }
}

export default App;