import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Project from '../components/Project';

function mapStateToProps(state) {
  return {
    project: state
  };
}

export default connect(mapStateToProps)(Project);
