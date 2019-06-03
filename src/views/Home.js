import React, { Component } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                { ProductName: "Chai", Price: 11 },
                { ProductName: "Chang", Price: 22 }
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

export default Main;