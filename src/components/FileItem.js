import React, { Component } from 'react';

class FileItem extends Component {
    constructor(props) {
        super(props);

        const { file } = this.props;
        const isImageType = file.type.startsWith("image/");
        this.state = {
            isImage: isImageType,
            imageData: "data:image/gif;base64,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",
            parsingResult: isImageType ? "n/a" : "Not an image.",
            inProgress: false
        };

        if (isImageType) {
            this.getImageData(file).then((result) => {
                this.setState({
                    imageData: result.imageData
                })
            });
        }
    }

    getImageData(file) {
        var reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => { reader.abort(); reject(new Error("Error parsing file.")); }
            reader.onloadend = function (e) {
                resolve({
                    imageData: reader.result
                });
            };
            reader.readAsDataURL(file);
        });
    }

    getSizeOf(bytes) {
        if (bytes === 0) { return "0.00 b"; }
        var e = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' kmgtp'.charAt(e) + 'b';
    }

    handleCloseClick(e) {
        e.preventDefault();
        const { file } = this.props;
        this.props.onClose(file);
    }

    handleParseClick(e) {
        e.preventDefault();

        this.setState({
            parsingResult: "Processing...",
            inProgress: true
        });

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://mnist.cobrain.io/api/ivanx32_github/ivan3";
        let base64String = this.state.imageData;
        base64String = base64String.substring(base64String.indexOf(",") + 1); // to remove 'data:image/gif;base64,' from the image data.

        fetch(proxyurl + url, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "method": "predict_digit_file",
                "params": [`b'${base64String}'`],
                "jsonrpc": "2.0",
                "id": 0
            })
        }).then(res => res.json())
            .then(res => {
                if (res.error) {
                    this.setState({
                        parsingResult: `${res.error.message} [${res.error.code}]`,
                        inProgress: false
                    });
                } else {
                    this.setState({
                        parsingResult: `${res.result}`,
                        inProgress: false
                    });
                }
            })
            .catch(error => {
                this.setState({
                    parsingResult: `Error occurred: ${error.message}`,
                    inProgress: false
                });
            });
    }

    render() {
        const { file } = this.props;
        return (
            <div className="file-item fl">
                <a href="#" className="close-classic" onClick={e => this.handleCloseClick(e)}></a>
                <img src={this.state.imageData} alt="" className={this.state.inProgress ? "grayscale" : ""} />
                <span>{file.name} ({this.getSizeOf(file.size)})</span>
                <button onClick={(e) => this.handleParseClick(e)} disabled={this.state.inProgress || !this.state.isImage}>Recognize</button>
                {this.state.inProgress && (
                    <svg className="spinner" viewBox="0 0 50 50">
                        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                )}
                <span>Result: {this.state.parsingResult}</span>
            </div>
        );
    }
}

export default FileItem;