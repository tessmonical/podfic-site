import React, { Component, Fragment } from "react";
import { TermsOfService } from "../TOS";
import "./submitform.css";

const Required = ({ children }) => (
  <Fragment>
    {children}
    <span className="required">*</span>
  </Fragment>
);

const Tooltip = ({ children, hoverText }) => (
  <div className="tooltip">
    {children}
    <div className="tooltip-text">{hoverText}</div>
  </div>
);

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      textUrl: "",
      filesDescriptions: [""],
      writer: "",
      writerUrl: "",
      reader: "",
      readerUrl: "",
      contactEmail: "",
      permissionCheckbox: false
    };
    this.removeFile = this.removeFile.bind(this);
    this.addFile = this.addFile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileRefs = [];
    this.imageRef = null;
  }

  removeFile(indexToRemove) {
    this.setState({
      filesDescriptions: this.state.filesDescriptions.filter(
        (file, i) => i !== indexToRemove
      )
    });
    this.fileRefs.splice(indexToRemove, 1);
  }

  addFile() {
    this.setState({
      filesDescriptions: [...this.state.filesDescriptions, ""]
    });
  }

  handleInputChange(type, text) {
    this.setState({ [type]: text });
  }

  handleCheckbox() {
    this.setState({ permissionCheckbox: !this.state.permissionCheckbox });
  }

  handleFileDescriptionChange(index, newText) {
    const newFiles = this.state.filesDescriptions.slice();
    newFiles[index] = newText;
    this.setState({
      filesDescriptions: newFiles
    });
  }

  validateForm() {
    const {
      title,
      filesDescriptions,
      writer,
      reader,
      permissionCheckbox
    } = this.state;

    if (title === "" || writer === "" || reader === "") return false;

    if (filesDescriptions.length < 1) return false;

    if (!permissionCheckbox) return false;

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      title,
      filesDescriptions,
      writer,
      writerUrl,
      reader,
      readerUrl,
      textUrl,
      contactEmail,
      permissionCheckbox
    } = this.state;
  }

  render() {
    const {
      title,
      filesDescriptions,
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
        <form onSubmit={this.handleSubmit}>
          <div className="metadata">
            <Tooltip hoverText="The title of the work you've podficced">
              <div>
                <label htmlFor="title">
                  <Required>Title</Required>
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={e =>
                    this.handleInputChange("title", e.target.value)
                  }
                />
              </div>
            </Tooltip>

            <Tooltip hoverText="URL for the original text, if you have one">
              <div>
                <label htmlFor="textUrl">Text URL</label>
                <input
                  id="textUrl"
                  value={textUrl}
                  onChange={e =>
                    this.handleInputChange("textUrl", e.target.value)
                  }
                />
              </div>
            </Tooltip>

            <div>
              <label htmlFor="image-upload">Image File</label>
              <input id="image-upload" type="file" />
            </div>

            <div>
              <label htmlFor="writer">
                <Required>Writer Name</Required>
              </label>
              <input
                id="writer"
                value={writer}
                onChange={e => this.handleInputChange("writer", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="writer-url">Writer URL</label>
              <input
                id="writer-url"
                value={writerUrl}
                onChange={e =>
                  this.handleInputChange("writerUrl", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor="reader">
                <Required>Reader</Required>
              </label>
              <input
                id="reader"
                value={reader}
                onChange={e => this.handleInputChange("reader", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="reader-url">Reader URL</label>
              <input
                id="reader-url"
                value={readerUrl}
                onChange={e =>
                  this.handleInputChange("readerUrl", e.target.value)
                }
              />
            </div>
            <div>
              <label htmlFor="contactEmail">
                <Required>Contact Email</Required>
              </label>
              <input
                id="contactEmail"
                value={contactEmail}
                onChange={e =>
                  this.handleInputChange("contactEmail", e.target.value)
                }
              />
            </div>
          </div>
          <div className="files">
            <fieldset>
              <legend>
                <Required>Audio Files</Required>
              </legend>
              {filesDescriptions.map((file, i) => (
                <div className="file-input">
                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => this.removeFile(i)}
                  >
                    X
                  </button>
                  <div>
                    <label htmlFor={`file${i + 1}`}>{`File ${i + 1}`}</label>
                    <input
                      id={`file${i + 1}`}
                      type="file"
                      ref={ref => {
                        this.fileRefs[i] = ref;
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`filename${i + 1}`}
                    >{`Short Description of file ${i + 1}`}</label>
                    <input
                      id={`filename${i + 1}`}
                      type="text"
                      value={file.description}
                      onChange={e =>
                        this.handleFileDescriptionChange(i, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="add-button"
                onClick={this.addFile}
              >
                Add another file
              </button>
              <div>
                <Required /> At least 1 required
              </div>
            </fieldset>
          </div>
          <div className="confirmation">
            <div>
              <input
                id="agreeCheckbox"
                type="checkbox"
                checked={permissionCheckbox}
                onChange={this.handleCheckbox}
              />
              <label htmlFor="agreeCheckbox">
                <Required>I agree to the terms and conditions</Required>:
                <TermsOfService />
              </label>
            </div>

            <div>
              <Required /> Required
            </div>

            <button type="submit" disabled={!this.validateForm()}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SubmitForm;
