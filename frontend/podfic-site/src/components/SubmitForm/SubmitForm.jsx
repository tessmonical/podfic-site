import React, { Component, Fragment } from "react";
import "./submitform.css";

const Required = ({ children }) => (
  <Fragment>
    {children}
    <span className="required">*</span>
  </Fragment>
);

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
    this.handleCheckbox = this.handleCheckbox.bind(this);
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

  handleCheckbox() {
    this.setState({ permissionCheckbox: !this.state.permissionCheckbox });
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
          <div className="metadata">
            <div>
              <label htmlFor="title">
                <Required>Title</Required>
              </label>
              <input
                id="title"
                value={title}
                onChange={e => this.handleInputChange("title", e.target.value)}
              />
            </div>

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
              <label htmlFor="reader-url">Reader Url</label>
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
              {files.map((file, i) => (
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
                    <input id={`file${i + 1}`} type="file" />
                  </div>
                  <div>
                    <label
                      htmlFor={`filename${i + 1}`}
                    >{`Short Description of file ${i + 1}`}</label>
                    <input
                      id={`filename${i + 1}`}
                      type="text"
                      value={file.description}
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
                <ol>
                  <li>
                    Don't upload copyrighted music or other copyrighted audio
                    except as allowed by USA fair use rules- we don't want to
                    get in trouble, and we're based in the US. Follow relevant
                    laws for your country as well.
                  </li>
                  <li>
                    Get permission to podfic other's works. We don't check you
                    on this- but if we get complaints from the writer, your work
                    may be taken down.
                  </li>
                  <li>
                    Please maintain backups of your own works. While we will
                    make every effort to keep files from getting lost, this site
                    is very much in beta and it is possible that data may be
                    lost.
                  </li>
                  <li>
                    Don't be a jerk. Don't harrass other users in any way.
                  </li>
                  <li>
                    For the time being, I'm moderating these manually. Please
                    have patience as I work through the queue.
                  </li>
                </ol>
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
