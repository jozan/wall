import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Wall from '../components/Wall';
import * as ProjectsActions from '../actions/projects';

function mapStateToProps(state) {
  return {
    projects: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Wall);
