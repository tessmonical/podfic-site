import React, { Component, Fragment } from "react";
import { Header } from "../../components/Header";
import { SubmitForm } from "../../components/SubmitForm";

class SubmitView extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <SubmitForm />
      </Fragment>
    );
  }
}

export default SubmitView;
