import { connect } from "react-redux";
import { fetchOnePodfic } from "../../store/podfics";
import SinglePodficView from "./SinglePodficView";

const mapStateToProps = (state, ownProps) => ({
  podfic:
    state.podfics.length && state.podfics[0].id === ownProps.match.params.id
      ? state.podfics[0]
      : null
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchThisPodfic: () => dispatch(fetchOnePodfic(ownProps.match.params.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePodficView);
