import React, { Component } from 'react';

class ImageParser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageData: "",
            isImage: false,
            jsonFile: null,
            parsingResult: ""
        };
    }

    handleFileChange(selectedFiles) {
        console.clear();

        if (selectedFiles.length === 0) {
            return;
        }

        var file = selectedFiles[0];

        this.getImagePreview(file).then((result) => {
            this.setState({
                imagePreview: result.imageData,
                isImage: result.imageData.startsWith("data:image/"),
                parsingResult: ""
            })
        })

        this.getJsonFile(file).then((jsonFile) => {
            this.setState({
                jsonFile: jsonFile
            })
        });
    }

    getImagePreview(file) {
        var reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onerror = () => { reader.abort(); reject(new Error("Error parsing file")); }
            reader.onloadend = function(e) {
                resolve({
                    imageData: reader.result
                });
            };
            reader.readAsDataURL(file);
        });
    }

    getJsonFile(file) {
        var reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onerror = () => { reader.abort(); reject(new Error("Error parsing file")); }
            reader.onload = function() {
                let bytes = Array.from(new Uint8Array(this.result));
                let base64StringFile = btoa(bytes.map((item) => String.fromCharCode(item)).join(""));
                resolve({
                    sizeInBytes: bytes.length,
                    base64StringFile: base64StringFile,
                    fileName: file.name,
                    fileType: file.type
                });
            }
            reader.readAsArrayBuffer(file);
        });
    }

    handleParseClick(event) {
        event.preventDefault();

        this.setState({
            inProgress: true
        });

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://mnist.cobrain.io/api/ivanx32_github/ivan3";
        fetch(proxyurl + url, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "method": "predict_digit_file",
                "params": [`b'${this.state.jsonFile.base64StringFile}'`],
                "jsonrpc": "2.0",
                "id": 0
            })
        }).then(res => res.json())
            .then(res => {
                if (res.error) {
                    this.setState({
                        parsingResult: `${res.error.message} [error code: ${res.error.code}]`,
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
                console.log('Image Parse Request failed : ' + error.message)
                this.setState({
                    parsingResult: `Error occurred: ${error.message}`,
                    inProgress: false
                });
            });
    }

    render() {
        return (
            <div className="img-parser-area">
                <input id="file-input" type="file" onChange={(e) => this.handleFileChange(e.target.files)} />
                <br /><br /><br />
                {this.state.imagePreview && (
                    <div className="image-preview">
                        {this.state.jsonFile && (
                            <span>Image Info: file name - '{this.state.jsonFile.fileName}', file type - '{this.state.jsonFile.fileType}', file size - {this.state.jsonFile.sizeInBytes} bytes.</span>
                        )}
                        <br />
                        <span>Image Preview: {!this.state.isImage ? 'N/A' : ''}</span>
                        <br />
                        <img src={this.state.imagePreview} alt="" />
                    </div>
                )}
                <br />
                {this.state.isImage && (
                    <div className="image-parse">
                        <button onClick={(e) => this.handleParseClick(e)} disabled={this.state.inProgress}>Parse Image</button>
                        {this.state.inProgress && (
                            <svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>
                        )}
                    </div>
                )}
                <br />
                {this.state.parsingResult && (
                    <div className="parsing-result">
                        Result: {this.state.parsingResult}
                    </div>
                )}
            </div>
        );
    }
}

export default ImageParser;