import { connect } from 'react-redux';
import RedirectToQuote from './RedirectToQuote';

const mapStateToProps = ({ nextId }) => ({ quoteId: nextId });

export default connect(mapStateToProps)(RedirectToQuote);