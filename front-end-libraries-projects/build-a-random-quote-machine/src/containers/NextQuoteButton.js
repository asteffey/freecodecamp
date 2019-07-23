import { connect } from 'react-redux';
import NewQuoteButton from '../components/NewQuoteButton';

const mapStateToProps = ({ status: { isLoading }, nextId }) => ({
    isLoading,
    nextId
});

export default connect(mapStateToProps)(NewQuoteButton);