import React, { Component } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import ImageParser from '../components/ImageParser'

class Home extends Component {
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
            <div className="grid">
                <Grid data={this.state.data}>
                    <GridColumn field="ProductName" title="Product name" />
                    <GridColumn field="Price" />
                </Grid>
                <br />
                <br />
                <ImageParser></ImageParser>
            </div>
        );
    }
}

export default Home;