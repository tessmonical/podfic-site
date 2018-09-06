import React, { Component, Fragment } from "react";
import "./submitform.css"

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      textUrl: "",
      imageFile: null,
      files: [{ description: "", file: null }],
      writer: "",
      authorUrl: "",
      reader: "",
      readerUrl: "",
      contactEmail: "",
      permissionCheckbox: false
    };
    this.removeFile = this.removeFile.bind(this);
    this.addFile = this.addFile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  removeFile(indexToRemove) {
    this.setState({
      files: this.state.files.filter((file, i) => i !== indexToRemove)
    });
  }

  addFile() {
    this.setState({
      files: [...this.state.files, { description: "", file: null }]
    });
  }

  handleInputChange(type, text) {
    this.setState({ [type]: text });
  }

  handleFileDescriptionChange(index, newText) {
    const newFiles = this.state.files.slice();
    newFiles[index].description = newText;
    this.setState({
      files: newFiles
    });
  }

  validateForm() {
    const {
      title,
      files,
      writer,
      reader,
      textUrl,
      permissionCheckbox
    } = this.state;

    if (title === "" || writer === "" || reader === "" || textUrl === "")
      return false;

    if (files.length < 1) return false;

    if (!permissionCheckbox) return false;

    return true;
  }

  render() {
    const {
      title,
      imageFile,
      files,
      writer,
      writerUrl,
      reader,
      readerUrl,
      textUrl,
      contactEmail,
      permissionCheckbox
    } = this.state;
    return (
      <div className="submit-form">
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={title}
              onChange={e => this.handleInputChange("title", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="image-upload">Image File</label>
            <input id="image-upload" type="file" />
          </div>

          <div>
            <label htmlFor="writer">Writer Name</label>
            <input
              id="writer"
              value={writer}
              onChange={e => this.handleInputChange("writer", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="writer-url">Writer Url</label>
            <input
              id="writer-url"
              value={writerUrl}
              onChange={e =>
                this.handleInputChange("writerUrl", e.target.value)
              }
            />
          </div>
          <div>
            <label htmlFor="reader">Reader</label>
            <input
              id="reader"
              value={reader}
              onChange={e => this.handleInputChange("reader", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="reader-url">Reader Url</label>
            <input
              id="reader-url"
              value={readerUrl}
              onChange={e =>
                this.handleInputChange("readerUrl", e.target.value)
              }
            />
          </div>
          {files.map((file, i) => (
            <div>
              <div>
                <label htmlFor={`file${i + 1}`}>{`Audio File ${i + 1}`}</label>
                <input id={`file${i + 1}`} type="file" />
              </div>
              <div>
                <label
                  htmlFor={`filename${i + 1}`}
                >{`Short Description of Audio file ${i + 1}`}</label>
                <input
                  id={`filename${i + 1}`}
                  type="text"
                  value={file.description}
                />
              </div>
              <button
                className="remove-button"
                type="button"
                onClick={() => this.removeFile(i)}
              >
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={this.addFile}>
            Add another file
          </button>

          <div>
            <input
              id="agreeCheckbox"
              type="checkbox"
              checked={permissionCheckbox}
            />
            <label htmlFor="agreeCheckbox">
              I agree to the terms and conditions:
              <ol>
                <li>
                  Don't upload copyrighted music or other audio except as
                  allowed by USA fair use rules- we don't want to get in
                  trouble.
                </li>
                <li>
                  Get permission to podfic other's work. We don't check you on
                  this- but if we get complaints, your work may be taken down
                </li>
                <li>
                  Please maintain backups of your own works. While we will make
                  every effort to keep files from getting lost, this site is
                  very much in beta and it is possible that data may be lost
                </li>
                <li>Don't be a jerk. Don't harrass other users in any way.</li>
              </ol>
            </label>
          </div>

          <button type="submit" disabled={!this.validateForm()}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default SubmitForm;
