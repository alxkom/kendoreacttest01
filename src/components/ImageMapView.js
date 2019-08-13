import React, { Component } from 'react';
import ImageMapper from 'react-image-mapper';
import ReactTooltip from 'react-tooltip';
import _forEach from 'lodash/forEach';
import jquery from "jquery";

class ImageMapView extends Component {
    constructor(props) {
        super(props);

        const { id } = this.props;
        this.state = {
            areas: {
                name: "areas-" + id,
                areas: [
                    {
                        id: "000",
                        name: "Area A Description",
                        shape: "rect",
                        coords: [91, 56, 250, 250],
                        href: "#",
                        lineWidth: "2",
                        strokeStyle: "red"
                    },
                    {
                        id: "111",
                        name: "Area B Description",
                        shape: "rect",
                        coords: [100, 255, 310, 425],
                        href: "#",
                        lineWidth: "2",
                        strokeStyle: "blue"
                    },
                    {
                        id: "222",
                        name: "Area C Description",
                        shape: "circle",
                        coords: [495, 225, 30],
                        href: "#",
                        lineWidth: "4",
                        strokeStyle: "green"
                    },
                    {
                        id: "333",
                        name: "Area D Description",
                        shape: "poly",
                        coords: [525, 350, 599, 330, 663, 387, 645, 486, 561, 509, 504, 459, 497, 384],
                        href: "#",
                        lineWidth: "3",
                        strokeStyle: "gray"
                    }
                ]
            }
        };
    }

    onMouseEnter(area, index, event) {
        ReactTooltip.show(event.target);
    }

    onMouseLeave(area, index, event) {
        ReactTooltip.hide();
        this.refreshAreas();
    }

    onClick(area, index, event) {
        console.log(area);
        console.log(index);
        console.log(event);
    }

    onLoad() {
        this.refreshAreas(true);
    }

    refreshAreas(onLoad) {
        const { id } = this.props;
        const className = ".imagemap-view-" + id;
        const dataFor = "imagemap-tip-" + id
        const canvas = jquery(className).find("canvas")[0];
        const items = jquery(className).find("area");
        const ctx = canvas.getContext("2d");
        let i = 0;

        _forEach(this.state.areas.areas, function(area) {

            if (area.shape === 'rect') {
                const left = area.coords[0];
                const top = area.coords[1];
                const width = area.coords[2] - area.coords[0];
                const height = area.coords[3] - area.coords[1];

                ctx.beginPath();
                ctx.lineWidth = area.lineWidth;
                ctx.strokeStyle = area.strokeStyle;
                ctx.rect(left, top, width, height);
                ctx.stroke();
            } else if (area.shape === 'circle') {
                const left = area.coords[0];
                const top = area.coords[1];
                const radius = area.coords[2];

                ctx.beginPath();
                ctx.lineWidth = area.lineWidth;
                ctx.strokeStyle = area.strokeStyle;
                ctx.arc(left, top, radius, 0, 2 * Math.PI);
                ctx.stroke();
            } else if (area.shape === 'poly') {
                ctx.beginPath();
                ctx.lineWidth = area.lineWidth;
                ctx.strokeStyle = area.strokeStyle;
                ctx.moveTo(area.coords[0], area.coords[1]);
                for (let k = 2; k < area.coords.length - 1; k += 2) {
                    ctx.lineTo(area.coords[k], area.coords[k + 1])
                }
                ctx.closePath();
                ctx.stroke();
            }

            if (onLoad) {
                const item = items[i++];
                jquery(item).attr("data-for", dataFor);
                jquery(item).attr("data-tip", area.name);
            }
        });

        ReactTooltip.rebuild();
    }

    render() {
        const { id } = this.props;

        return (
            <div className={"position-absolute imagemap-view-" + id}>
                <ImageMapper src="https://3opinion.ai/frontend_api/blood_cell_recognitions/905/preview" width={730} height={550} map={this.state.areas}
                    fillColor={"rgba(0, 255, 0, 0.5)"} strokeColor={"rgba(255, 0, 0, 0.5)"} active={true}
                    onMouseEnter={(area, index, event) => this.onMouseEnter(area, index, event)}
                    onMouseLeave={(area, index, event) => this.onMouseLeave(area, index, event)}
                    onClick={(area, index, event) => this.onClick(area, index, event)}
                    onLoad={() => this.onLoad()} />
                <ReactTooltip id={"imagemap-tip-" + id} type='info' getContent={(dataTip) => dataTip}></ReactTooltip>
            </div>
        );
    }
}

export default ImageMapView;