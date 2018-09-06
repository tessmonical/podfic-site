import React, { Component, Fragment } from "react";

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      textUrl: "",
      imageFile: null,
      files: [{ description: "", file: null }],
      author: "",
      authorUrl: "",
      reader: "",
      readerUrl: "",
      permissionCheckbox: false
    };
    this.removeFile = this.removeFile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  removeFile(indexToRemove) {
    this.setState({
      files: this.state.files.filter((file, i) => i !== indexToRemove)
    });
  }

  handleInputChange(type, text) {
    this.setState({ [type]: text });
  }

  render() {
    const {
      title,
      imageFile,
      files,
      author,
      authorUrl,
      reader,
      readerUrl,
      textUrl,
      permissionCheckbox
    } = this.state;
    return (
      <div>
        <form>
          <input name="title" value={title} />
          <input name="author" value={author} />
          {files.map((file, i) => (
            <Fragment>
              <label htmlFor={`file${i + 1}`}>{`Audio File ${i + 1}`}</label>
              <input name={`file${i + 1}`} type="file" value={file.file} />
              <label
                htmlFor={`filename${i + 1}`}
              >{`Short Description of Audio file ${i + 1}`}</label>
              <input
                name={`filename${i + 1}`}
                type="text"
                value={file.description}
              />
            </Fragment>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SubmitForm;
