import { connect } from 'react-redux';
import Quote from '../components/Quote';

const mapStateToProps = ({ status, quote }) => ({
    status,
    quote
});

export default connect(mapStateToProps)(Quote);